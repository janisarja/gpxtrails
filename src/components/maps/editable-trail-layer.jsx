'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { createElement, Pencil, Eraser } from 'lucide';
import 'leaflet/dist/leaflet.css';
import 'leaflet-editable';
import 'leaflet-easybutton';

const EDIT_WINDOW_SIZE = 40;
const HALF_WINDOW = Math.floor(EDIT_WINDOW_SIZE / 2);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const findNearestVertexIndex = (latlngs, clickLatLng) => {
  if (!latlngs.length) {
    return -1;
  }

  let nearestIndex = 0;
  let nearestDistance = Infinity;

  for (let index = 0; index < latlngs.length; index += 1) {
    const distance = clickLatLng.distanceTo(latlngs[index]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  }

  return nearestIndex;
};

const computeEditableWindow = (pointCount, anchorIndex) => {
  if (pointCount <= EDIT_WINDOW_SIZE || pointCount <= 0) {
    return { start: 0, end: Math.max(pointCount - 1, 0) };
  }

  let start = clamp(anchorIndex - HALF_WINDOW, 0, pointCount - EDIT_WINDOW_SIZE);
  let end = start + EDIT_WINDOW_SIZE - 1;

  if (end >= pointCount) {
    end = pointCount - 1;
    start = Math.max(0, end - EDIT_WINDOW_SIZE + 1);
  }

  return { start, end };
};

const normalizeEditableWindow = (start, end, pointCount) => {
  if (pointCount <= 0) {
    return { start: 0, end: 0 };
  }

  if (pointCount <= EDIT_WINDOW_SIZE) {
    return { start: 0, end: pointCount - 1 };
  }

  let normalizedStart = clamp(start, 0, pointCount - 1);
  let normalizedEnd = clamp(end, normalizedStart, pointCount - 1);

  if (normalizedEnd - normalizedStart + 1 > EDIT_WINDOW_SIZE) {
    normalizedEnd = normalizedStart + EDIT_WINDOW_SIZE - 1;
  }

  if (normalizedEnd - normalizedStart + 1 < EDIT_WINDOW_SIZE) {
    const missing = EDIT_WINDOW_SIZE - (normalizedEnd - normalizedStart + 1);
    const growRight = Math.min(missing, pointCount - 1 - normalizedEnd);
    normalizedEnd += growRight;

    const remaining = missing - growRight;
    if (remaining > 0) {
      normalizedStart = Math.max(0, normalizedStart - remaining);
    }
  }

  return { start: normalizedStart, end: normalizedEnd };
};

const getVertexIndex = (vertex) => {
  if (!vertex) {
    return -1;
  }

  if (typeof vertex.getIndex === 'function') {
    const index = vertex.getIndex();
    return Number.isInteger(index) ? index : -1;
  }

  if (Number.isInteger(vertex._index)) {
    return vertex._index;
  }

  return -1;
};

const getMiddleMarkerFromEvent = (event) => {
  return event?.middleMarker || event?.middlemarker || event?.marker || null;
};

const EditableTrailLayer = ({ loadedTrail, onPolylineReady }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !map.editTools) return;

    const isLoadedTrail = Boolean(loadedTrail?.geometry?.coordinates?.length);

    // Create icons
    const drawIcon = createElement(Pencil).outerHTML;
    const eraseIcon = createElement(Eraser).outerHTML;

    // Initialize the polyline from gpxTrail or empty if not provided
    const latlngs = loadedTrail?.geometry?.coordinates?.map(([lon, lat]) => [lat, lon]);
    const polyline = L.polyline(latlngs || [], { color: 'blue' }).addTo(map);

    let isEditMode = !isLoadedTrail;
    let editableWindow = null;
    let isEraseMode = false;
    let activeDrawingDirection = null;
    let lastSelectionIndex = null;
    let lastVertexInteractionAt = 0;
    let restoreEditorPatch = null;

    const getLatLngs = () => polyline.getLatLngs();
    const hasEnoughPointsToErase = () => getLatLngs().length > 2;

    const ensureWindowForCurrentPoints = ({ deletedIndex, addedIndex } = {}) => {
      const points = getLatLngs();
      if (!points.length) {
        editableWindow = { start: 0, end: 0 };
        return;
      }

      if (!editableWindow) {
        editableWindow = computeEditableWindow(points.length, points.length - 1);
        return;
      }

      let nextStart = editableWindow.start;
      let nextEnd = editableWindow.end;

      if (Number.isInteger(deletedIndex)) {
        if (deletedIndex < nextStart) {
          nextStart -= 1;
          nextEnd -= 1;
        } else if (deletedIndex <= nextEnd) {
          nextEnd -= 1;
        }
      }

      if (Number.isInteger(addedIndex)) {
        if (addedIndex < nextStart) {
          nextStart += 1;
          nextEnd += 1;
        } else if (addedIndex <= nextEnd) {
          nextEnd += 1;
        } else {
          const previousLastIndex = Math.max(points.length - 2, 0);
          if (nextEnd === previousLastIndex) {
            nextStart += 1;
            nextEnd += 1;
          }
        }
      }

      editableWindow = normalizeEditableWindow(nextStart, nextEnd, points.length);
    };

    const isIndexInsideWindow = (index) => {
      if (!isEditMode || !editableWindow) {
        return false;
      }

      if (!isLoadedTrail) {
        return true;
      }

      if (!Number.isInteger(index)) {
        return false;
      }

      return index >= editableWindow.start && index <= editableWindow.end;
    };

    const isMiddleMarkerInsideWindow = (middleMarker) => {
      if (!isLoadedTrail) {
        return true;
      }

      if (!middleMarker) {
        return false;
      }

      const leftIndex = getVertexIndex(middleMarker.left);
      const rightIndex = getVertexIndex(middleMarker.right);
      return isIndexInsideWindow(leftIndex) && isIndexInsideWindow(rightIndex);
    };

    const syncVertexVisibility = () => {
      const points = getLatLngs();

      for (let index = 0; index < points.length; index += 1) {
        const vertex = points[index]?.__vertex;
        const icon = vertex?._icon;

        if (!vertex) {
          continue;
        }

        const shouldBeVisible = !isLoadedTrail || isIndexInsideWindow(index);

        if (vertex.dragging) {
          if (shouldBeVisible) {
            vertex.dragging.enable();
          } else {
            vertex.dragging.disable();
          }
        }

        if (icon) {
          icon.style.display = shouldBeVisible ? '' : 'none';
          icon.style.pointerEvents = shouldBeVisible ? '' : 'none';
        }
      }

      const editLayer = polyline.editor?.editLayer;
      if (editLayer && typeof editLayer.eachLayer === 'function') {
        editLayer.eachLayer((layer) => {
          const icon = layer?._icon;
          if (!icon) {
            return;
          }

          if (!layer?.left || !layer?.right) {
            return;
          }

          const shouldBeVisible = isMiddleMarkerInsideWindow(layer);

          if (layer.dragging) {
            if (shouldBeVisible) {
              layer.dragging.enable();
            } else {
              layer.dragging.disable();
            }
          }

          icon.style.display = shouldBeVisible ? '' : 'none';
          icon.style.pointerEvents = shouldBeVisible ? '' : 'none';
        });
      }
    };

    const canContinueForward = () => {
      if (!isLoadedTrail || !editableWindow) {
        return true;
      }

      const lastIndex = getLatLngs().length - 1;
      return editableWindow.end === lastIndex;
    };

    const canContinueBackward = () => {
      if (!isLoadedTrail || !editableWindow) {
        return true;
      }

      return editableWindow.start === 0;
    };

    const pickNearestAllowedDirection = (anchorIndex) => {
      const allowForward = canContinueForward();
      const allowBackward = canContinueBackward();

      if (!allowForward && !allowBackward) {
        return null;
      }

      if (allowForward && !allowBackward) {
        return 'forward';
      }

      if (!allowForward && allowBackward) {
        return 'backward';
      }

      const lastIndex = getLatLngs().length - 1;
      const targetIndex = Number.isInteger(anchorIndex) ? anchorIndex : lastIndex;
      const distanceToStart = Math.abs(targetIndex);
      const distanceToEnd = Math.abs(lastIndex - targetIndex);

      return distanceToStart <= distanceToEnd ? 'backward' : 'forward';
    };

    const pickNearestDirectionForWindow = (anchorIndex, window, pointCount) => {
      if (!isLoadedTrail) {
        return 'forward';
      }

      const allowBackward = window.start === 0;
      const allowForward = window.end === pointCount - 1;

      if (!allowForward && !allowBackward) {
        return null;
      }

      if (allowForward && !allowBackward) {
        return 'forward';
      }

      if (!allowForward && allowBackward) {
        return 'backward';
      }

      const lastIndex = pointCount - 1;
      const targetIndex = Number.isInteger(anchorIndex) ? anchorIndex : lastIndex;
      const distanceToStart = Math.abs(targetIndex);
      const distanceToEnd = Math.abs(lastIndex - targetIndex);

      return distanceToStart <= distanceToEnd ? 'backward' : 'forward';
    };

    const stopActiveDrawing = () => {
      if (map.editTools.drawing()) {
        map.editTools.stopDrawing();
      }
      activeDrawingDirection = null;
    };

    const startActiveDrawing = (direction) => {
      if (!isEditMode || isEraseMode || !direction) {
        return false;
      }

      if (direction === 'forward' && !canContinueForward()) {
        return false;
      }

      if (direction === 'backward' && !canContinueBackward()) {
        return false;
      }

      stopActiveDrawing();

      if (direction === 'backward') {
        polyline.editor.continueBackward();
      } else {
        polyline.editor.continueForward();
      }

      activeDrawingDirection = direction;
      return true;
    };

    const updateButtonVisibility = () => {
      const buttonElement = editModeButton?.button;
      if (!buttonElement) {
        return;
      }

      buttonElement.style.display = isEditMode ? '' : 'none';
    };

    const patchEditorMarkerCreation = () => {
      const editor = polyline.editor;
      if (!editor || editor.__contextWindowPatched) {
        return;
      }

      const originalAddVertexMarkers = editor.addVertexMarkers;

      editor.addVertexMarkers = function (latlngs) {
        const bounds = this.map.getBounds();

        for (let index = 0; index < latlngs.length; index += 1) {
          const latlng = latlngs[index];
          if (!bounds.contains(latlng)) {
            continue;
          }

          const hasWindowRestriction = isLoadedTrail && isEditMode && editableWindow;
          if (
            hasWindowRestriction &&
            (index < editableWindow.start || index > editableWindow.end)
          ) {
            continue;
          }

          this.addVertexMarker(latlng, latlngs);
        }
      };

      editor.__contextWindowPatched = true;
      restoreEditorPatch = () => {
        editor.addVertexMarkers = originalAddVertexMarkers;
        delete editor.__contextWindowPatched;
      };
    };

    const activateEditMode = ({ autoStartDrawing, anchorIndex, preferredDirection } = {}) => {
      const points = getLatLngs();

      if (points.length) {
        const targetIndex = Number.isInteger(anchorIndex)
          ? clamp(anchorIndex, 0, points.length - 1)
          : points.length - 1;
        lastSelectionIndex = targetIndex;
        editableWindow = computeEditableWindow(points.length, targetIndex);
      } else {
        lastSelectionIndex = 0;
        editableWindow = { start: 0, end: 0 };
      }

      polyline.enableEdit(map);
      patchEditorMarkerCreation();
      isEditMode = true;
      polyline.editor.reset();
      updateButtonVisibility();
      syncVertexVisibility();

      if (autoStartDrawing) {
        const direction = preferredDirection || pickNearestAllowedDirection(lastSelectionIndex);
        startActiveDrawing(direction);
      }
    };

    const deactivateEditMode = () => {
      if (!isEditMode) {
        return;
      }

      stopActiveDrawing();

      polyline.disableEdit();
      editableWindow = null;
      isEditMode = false;
      isEraseMode = false;
      map._eraseMode = false;
      editModeButton.state('draw-mode');
      updateButtonVisibility();
    };

    // Button to go between draw and erase modes
    var editModeButton = L.easyButton({
      states: [
        {
          stateName: 'draw-mode',
          icon: drawIcon,
          title: 'Switch to Erase Mode',
          onClick: (btn, map) => {
            if (!isEditMode) {
              return;
            }

            if (hasEnoughPointsToErase()) {
              map.editTools.commitDrawing();
              activeDrawingDirection = null;
              map._eraseMode = true;
              isEraseMode = true;
              btn.state('erase-mode');
            }
          }
        },
        {
          stateName: 'erase-mode',
          icon: eraseIcon,
          title: 'Switch to Draw Mode',
          onClick: (btn, map) => {
            map._eraseMode = false;
            isEraseMode = false;
            btn.state('draw-mode');
            if (isEditMode) {
              startActiveDrawing(pickNearestAllowedDirection(lastSelectionIndex));
            }
          }
        }
      ]
    }).addTo(map);

    const resetDrawingMode = () => {
      map._eraseMode = false;
      isEraseMode = false;
      editModeButton.state('draw-mode');
    };

    updateButtonVisibility();

    if (isLoadedTrail) {
      polyline.disableEdit();
    } else {
      activateEditMode({ autoStartDrawing: true, preferredDirection: 'forward' });
    }

    const handleTrailClick = (e) => {
      if (Date.now() - lastVertexInteractionAt < 120) {
        return;
      }

      const points = getLatLngs();

      if (!points.length) {
        activateEditMode({ autoStartDrawing: true, preferredDirection: 'forward' });
        return;
      }

      const nearestIndex = findNearestVertexIndex(points, e.latlng);

      const selectedWindow = computeEditableWindow(points.length, nearestIndex);
      const touchesEndpoint = selectedWindow.start === 0 || selectedWindow.end === points.length - 1;
      const selectedDirection = pickNearestDirectionForWindow(
        nearestIndex,
        selectedWindow,
        points.length
      );

      activateEditMode({
        autoStartDrawing: !isEraseMode && touchesEndpoint,
        preferredDirection: selectedDirection,
        anchorIndex: nearestIndex
      });
    };

    const handleClick = (e) => {
      lastVertexInteractionAt = Date.now();

      const vertexIndex = getVertexIndex(e.vertex);
      lastSelectionIndex = vertexIndex;
      const isWindowVertex = isIndexInsideWindow(vertexIndex);

      if (isLoadedTrail && !isWindowVertex) {
        e.cancel();
        return;
      }

      if (!map._eraseMode) {
        // Cancel default erase behaviour in draw mode
        e.cancel();

        // Stop drawing if there are at least 2 points and user clicks on vertex, otherwise continue drawing if user clicks on an end vertex
        if (map.editTools.drawing() && getLatLngs().length >= 2){
          stopActiveDrawing();
        } else {
          if (!isLoadedTrail) {
            e.vertex.continue();
            activeDrawingDirection = getVertexIndex(e.vertex) === 0 ? 'backward' : 'forward';
            return;
          }

          const lastIndex = getLatLngs().length - 1;
          if (vertexIndex === 0 && canContinueBackward()) {
            startActiveDrawing('backward');
          } else if (vertexIndex === lastIndex && canContinueForward()) {
            startActiveDrawing('forward');
          }
        }
      }
    };

    const handleVertexDragStart = (e) => {
      lastVertexInteractionAt = Date.now();

      const vertexIndex = getVertexIndex(e.vertex);
      if (isLoadedTrail && !isIndexInsideWindow(vertexIndex)) {
        e.cancel();
      }
    };

    const handleMapClick = (e) => {
      if (!isEditMode || !isLoadedTrail) {
        return;
      }

      const clickedTrail = e?.originalEvent?.target?.closest('.leaflet-interactive');
      if (clickedTrail) {
        return;
      }

      if (map.editTools.drawing()) {
        return;
      }

      deactivateEditMode();
    };

    const handleMiddleMarkerMouseDown = (e) => {
      lastVertexInteractionAt = Date.now();
      const middleMarker = getMiddleMarkerFromEvent(e);

      if (isLoadedTrail && !isMiddleMarkerInsideWindow(middleMarker)) {
        e.cancel();
      }
    };

    const handleVertexDeleted = (e) => {
      lastVertexInteractionAt = Date.now();
      const deletedIndex = getVertexIndex(e.vertex);
      ensureWindowForCurrentPoints({ deletedIndex });
      syncVertexVisibility();
      if (isEditMode && !hasEnoughPointsToErase()) {
        resetDrawingMode();
      }
    };

    const handleVertexAdded = (e) => {
      const addedIndex = getVertexIndex(e.vertex);
      ensureWindowForCurrentPoints({ addedIndex });
      if (Number.isInteger(addedIndex)) {
        lastSelectionIndex = addedIndex;
      }
      syncVertexVisibility();
    };

    polyline.on('click', handleTrailClick);

    map.on('editable:vertex:click', handleClick);
    map.on('editable:vertex:dragstart', handleVertexDragStart);
    map.on('editable:middlemarker:mousedown', handleMiddleMarkerMouseDown);
    map.on('editable:vertex:deleted', handleVertexDeleted);
    map.on('editable:vertex:new', handleVertexAdded);
    map.on('click', handleMapClick);

    // Set polyline for geojson extraction
    onPolylineReady?.(polyline);

    // Cleanup on unmount
    return () => {
      polyline.off('click', handleTrailClick);
      map.off('editable:vertex:click', handleClick);
      map.off('editable:vertex:dragstart', handleVertexDragStart);
      map.off('editable:middlemarker:mousedown', handleMiddleMarkerMouseDown);
      map.off('editable:vertex:deleted', handleVertexDeleted);
      map.off('editable:vertex:new', handleVertexAdded);
      map.off('click', handleMapClick);
      restoreEditorPatch?.();
      map.removeControl(editModeButton);
      map.removeLayer(polyline);
    }
  }, [map, loadedTrail, onPolylineReady]);

  return null;
}

export default EditableTrailLayer;

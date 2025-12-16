'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { createElement, Route, Pencil, Eraser } from 'lucide';
import 'leaflet/dist/leaflet.css';
import 'leaflet-editable';
import 'leaflet-easybutton';

const EditableTrailLayer = ({ loadedTrail, onPolylineReady }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !map.editTools) return;

    // Create icons
    const drawIcon = createElement(Pencil).outerHTML;
    const eraseIcon = createElement(Eraser).outerHTML;

    // Initialize the polyline from gpxTrail or empty if not provided
    const latlngs = loadedTrail?.geometry?.coordinates?.map(([lon, lat]) => [lat, lon]);
    const polyline = L.polyline(latlngs || [], { color: 'blue' }).addTo(map);
    polyline.enableEdit(map);
    polyline.editor.continueForward();

    // Button to go between draw and erase modes
    var editModeButton = L.easyButton({
      states: [
        {
          stateName: 'draw-mode',
          icon: drawIcon,
          title: 'Switch to Erase Mode',
          onClick: (btn, map) => {
            if (polyline.getLatLngs().length > 2) {
              map.editTools.commitDrawing();
              map._eraseMode = true;
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
            btn.state('draw-mode');
          }
        }
      ]
    }).addTo(map);

    const handleClick = (e) => {
      if (!map._eraseMode) {
        // Cancelf default erase behaviour in draw mode
        e.cancel();
        // Stop drawing if there are at least 2 points and user clicks on vertex, otherwise continue drawing if user clicks on an end vertex
        if (map.editTools.drawing() && polyline.getLatLngs().length >= 2){
          map.editTools.stopDrawing();
        } else {
          e.vertex.continue();
        }
      }
    }

    map.on('editable:vertex:click', handleClick);

    // Set polyline for geojson extraction
    onPolylineReady?.(polyline);

    // Cleanup on unmount
    return () => {
      map.off('editable:vertex:click', handleClick);
      map.removeControl(editModeButton);
      map.removeLayer(polyline);
    }
  }, [map, loadedTrail, onPolylineReady]);

  return null;
}

export default EditableTrailLayer;

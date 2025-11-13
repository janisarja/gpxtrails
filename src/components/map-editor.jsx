'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-editable';
import 'leaflet-easybutton'
import 'leaflet/dist/leaflet.css';
import { createElement, Route, Eraser } from 'lucide';

const drawIcon = createElement(Route).outerHTML;
const eraseIcon = createElement(Eraser).outerHTML;

const EditableTrailLayer = ({ gpxTrail }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !map.editTools) return;

    // Initialize the polyline from gpxTrail or empty if not provided
    const latlngs = gpxTrail?.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
    const polyline = L.polyline(latlngs || [], { color: 'blue' }).addTo(map);
    polyline.enableEdit(map);
    polyline.editor.continueForward();

    // Fit map to polyline bounds if it has points
    if (polyline.getLatLngs().length > 0) map.fitBounds(polyline.getBounds());

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

    const clickHandler = (e) => {
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

    map.on('editable:vertex:click', clickHandler);

    // Cleanup on unmount
    return () => {
      map.off('editable:vertex:click', clickHandler);
      map.removeControl(editModeButton);
      map.removeLayer(polyline);
    }
  }, [map, gpxTrail]);

  return null;
}

const MapEditor = ({ gpxTrail }) => {
  return (
    <div>
      <p> In draw mode click on one of the ends to start drawing. Click on any point to stop drawing. Click and drag points to move them. Add more points in the middle of the line by clicking and dragging on them. In erase mode click on points to delete them. Use button in top left corner to switch between draw mode and erase mode. You must add atleast two points before switching to erase mode.</p>
      <MapContainer 
        editable={true}
        center={[65.556229, 26.999255]}
        zoom={4.3} 
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='Map Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map Display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href=https://creativecommons.org/licenses/by-sa/3.0/>CC-BY-SA<a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        />
        <EditableTrailLayer gpxTrail={gpxTrail}/>
      </MapContainer>
    </div>
  );
}

export default MapEditor;

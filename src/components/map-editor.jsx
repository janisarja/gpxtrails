'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-editable';
import 'leaflet-easybutton'
import 'leaflet/dist/leaflet.css';
import { createElement, Route, Eraser } from 'lucide';

const drawIcon = createElement(Route).outerHTML;
const eraseIcon = createElement(Eraser).outerHTML;

const EditableTrailLayer = () => {
  const map = useMap();
  //const [eraseMode, setEraseMode] = useState(false);

  useEffect(() => {
    if (!map || !map.editTools) return;

    // Create an editable polyline
    const polyline = L.polyline([], { color: 'blue' }).addTo(map);
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
            if (polyline.getLatLngs().length >= 2) {
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
        e.cancel();
        if (map.editTools.drawing() && polyline.getLatLngs().length >= 2){
          map.editTools.stopDrawing();
        } else {
          e.vertex.continue();
        }
      }
    }

    map.on('editable:vertex:click', clickHandler);

    return () => {
      map.off('editable:vertex:click', clickHandler);
      map.removeControl(editModeButton);
      map.removeLayer(polyline);
    }
  }, [map]);

  return null;
}

const MapEditor = () => {
  return (
    <div>
      <p> In draw mode click on one of the ends to start drawing. Click on any point to stop drawing. Click and drag points to move them. Add more points in the middle of the line by clicking and dragging on them. In erase mode click on points to delete them. Use button in top left corner to switch between draw mode and erase mode. You must add atleast two points before switching to erase mode.</p>
      <MapContainer 
        editable={true}
        center={[51.505, -0.09]}
        zoom={13} 
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='Map Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map Display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href=https://creativecommons.org/licenses/by-sa/3.0/>CC-BY-SA<a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        />
        <EditableTrailLayer />
      </MapContainer>
    </div>
  );
}

export default MapEditor;

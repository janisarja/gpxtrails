'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-editable';
import 'leaflet/dist/leaflet.css';


const EditableTrailLayer = () => {
  const map = useMap();

  useEffect(() => {
    console.log('Here');
    if (!map || !map.editTools) return;
    console.log('Map Editor - map and editTools available');

    // Create an editable polyline
    const polyline = L.polyline([], { color: 'green' }).addTo(map);
    polyline.enableEdit(map);

    // Start drawing immediately
    map.editTools.startPolyline();
  }, [map]);

  return null;
}

const MapEditor = () => {
  return (
    <MapContainer 
      editable={true}
      center={[51.505, -0.09]}
      zoom={13} 
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='Map Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map Display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href=https://creativecommons.org/licenses/by-sa/3.0/>CC-BY-SA<a>)'
        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
      />
      <EditableTrailLayer />
    </MapContainer>
  );
}

export default MapEditor;

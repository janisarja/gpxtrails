'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

const Map = ({ trailLayer }) => {

  return (
    <MapContainer 
      editable={true}
      center={[65.556229, 26.999255]}
      zoom={4.3} 
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='Map Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map Display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href=https://creativecommons.org/licenses/by-sa/3.0/>CC-BY-SA<a>)'
        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
      />
      {trailLayer}
    </MapContainer>
  );
}

export default Map;

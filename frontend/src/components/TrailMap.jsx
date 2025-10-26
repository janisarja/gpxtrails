import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';

const TrailMap = ({ trail, center }) => {
  if (trail && center) return (
    <MapContainer 
      center={[center.geometry.coordinates[1],center.geometry.coordinates[0]]} 
      zoom={13} 
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='Map Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map Display: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href=https://creativecommons.org/licenses/by-sa/3.0/>CC-BY-SA<a>)'
        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
      />
      <GeoJSON data={trail} />
    </MapContainer>
  );
}

export default TrailMap;

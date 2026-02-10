'use client';

import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Map from '@/src/components/maps/map';

const TrailMap = ({ trail }) => {
  if (trail) return (
    <Map ariaLabel="Trail map" trailLayer={<GeoJSON data={trail} />} />
  );
  else return <p>Could not load the trail.</p>;
}

export default TrailMap;

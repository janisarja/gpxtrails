'use client';
import { CircleMarker, Popup } from 'react-leaflet';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import Map from './map';

const AllTrailsMap = ({ trails }) => {
  if (!trails || !Array.isArray(trails)) return <p>Could not load trails.</p>;

  const trailLayer = trails.map((trail) => {
    const id = trail.id;
    const coords = trail.center?.geometry?.coordinates;
    // Convert from [lng, lat] to [lat, lng]
    if (!coords || coords.length < 2) return null;
    const latlng = [coords[1], coords[0]];

    const distance = `${trail.distance_km.toFixed(1)} km`;

    return (
      <CircleMarker key={id} center={latlng} radius={6} pathOptions={{ color: 'blue' }}>
        <Popup>
          <div>
            <Link href={`/trails/${trail.id}`}>
              <strong>{trail.name}</strong>
            </Link>
            <br />
            {distance}
          </div>
        </Popup>
      </CircleMarker>
    );
  });

  return <Map trailLayer={trailLayer} />;
};

export default AllTrailsMap;

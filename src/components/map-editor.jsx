'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import EditableTrailLayer from './editable-trail-layer';
import GPXLoader from './gpx-loader';

const Map = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const MapEditor = ({ onPolylineReady }) => {
  const [loadedTrail, setLoadedTrail] = useState(null);

  return (
    <div>
      <GPXLoader setTrail={setLoadedTrail} />
      <p> In draw mode click on one of the ends to start drawing. Click on any point to stop drawing. Click and drag points to move them. Add more points in the middle of the line by clicking and dragging on them. In erase mode click on points to delete them. Use button in top left corner to switch between draw mode and erase mode. You must add atleast two points before switching to erase mode.</p>
      <Map trailLayer={<EditableTrailLayer loadedTrail={loadedTrail} onPolylineReady={onPolylineReady}/>} />
    </div>
  );
}

export default MapEditor;

'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import EditableTrailLayer from './editable-trail-layer';
import GPXUploader from './gpx-uploader';

const Map = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const MapEditor = ({ onPolylineReady }) => {
  const gpxTrail = useMemo(() => ({
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [24.9384, 61.1699],
        [24.9391, 60.1703],
        [24.9000, 60.1700]
      ]
    },
    "properties": {}
  }), []);

  return (
    <div>
      <GPXUploader />
      <p> In draw mode click on one of the ends to start drawing. Click on any point to stop drawing. Click and drag points to move them. Add more points in the middle of the line by clicking and dragging on them. In erase mode click on points to delete them. Use button in top left corner to switch between draw mode and erase mode. You must add atleast two points before switching to erase mode.</p>
      <Map trailLayer={<EditableTrailLayer gpxTrail={gpxTrail} onPolylineReady={onPolylineReady}/>} />
    </div>
  );
}

export default MapEditor;

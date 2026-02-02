'use client';

import dynamic from 'next/dynamic';
import EditableTrailLayer from './editable-trail-layer';

const Map = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const MapEditor = ({ onPolylineReady, loadedTrail }) => {

  return (
    <Map 
      trailLayer={<EditableTrailLayer 
        loadedTrail={loadedTrail} 
        onPolylineReady={onPolylineReady}
      />} 
    />
  );
}

export default MapEditor;

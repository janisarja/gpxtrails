'use client';

import dynamic from 'next/dynamic';

const MapEditor = dynamic(() => import('./map-editor'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const MapEditorWrapper = (props) => {
  return <MapEditor {...props} />;
};

export default MapEditorWrapper;

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapEditor = dynamic(() => import('@/src/components/map-editor'), { 
  ssr: false,
  loading: () => <p>Loading map editor...</p>, 
});

const Page = () => {
  const [polyline, setPolyline] = useState(null);

  const handleUpload = () => {
    const geojson = polyline?.toGeoJSON();
    console.log('Upload:', geojson);
  };

  return (
    <div>
      <MapEditor onPolylineReady={setPolyline} />
      <button onClick={handleUpload}>Upload Trail</button>
    </div>
  );
}

export default Page;

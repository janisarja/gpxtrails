"use client";

import GPXUploader from '@/src/components/gpx-uploader';
import MapEditorWrapper from '@/src/components/map-editor-wrapper';
import { useState } from 'react';

const Page = () => {
  const [polyline, setPolyline] = useState(null);

  const handleUpload = () => {
    const geojson = polyline?.toGeoJSON();
    console.log('Upload:', geojson);
  };

  return (
    <div>
      <GPXUploader />
      <MapEditorWrapper onPolylineReady={setPolyline} />
      <button onClick={handleUpload}>Upload Trail</button>
    </div>
  );
}

export default Page;

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapEditor = dynamic(() => import('@/src/components/map-editor'), { 
  ssr: false,
  loading: () => <p>Loading map editor...</p>, 
});

const TrailEditor = ({ apiCall, buttonText }) => {
  const [polyline, setPolyline] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const geojson = polyline?.toGeoJSON();

    console.log('Upload:', geojson);
    console.log('Name:', name);
    console.log('Description:', description);
  };

  return (
    <div>
      <MapEditor onPolylineReady={setPolyline} />
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Trail Name:
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
}

export default TrailEditor;

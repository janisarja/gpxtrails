'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapEditor = dynamic(() => import('@/src/components/map-editor'), { 
  ssr: false,
  loading: () => <p>Loading map editor...</p>, 
});

// API call and buttontext are passed as props to allow use for both uploading
// new trails and editing existing ones.
const TrailEditor = ({ apiCall, buttonText }) => {
  const [polyline, setPolyline] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const geojson = polyline?.toGeoJSON();

    if (!geojson) {
      alert('No trail to upload');
      return;
    }

    if (!name) {
      alert('Please provide a trail name');
      return;
    }

    const payload = {
      name,
      description,
      geojson
    };
    
    try {
      const res = await apiCall(payload);
      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }
      console.log('Trail uploaded:', res.json());
      alert('Trail uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Upload failed');
    }
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

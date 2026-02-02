'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TrailForm from './trail-form'
import MapInstructions from './map-instructions.jsx';
import GPXLoader from './gpx-loader';

const MapEditor = dynamic(() => import('./map-editor'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

// API call and buttontext are passed as props to allow use for both uploading
// new trails and editing existing ones.
const TrailEditor = ({ apiCall, buttonText }) => {
  const [polyline, setPolyline] = useState(null);
  const [loadedTrail, setLoadedTrail] = useState(null);
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
      <GPXLoader setTrail={setLoadedTrail} />
      <TrailForm 
        buttonText={buttonText}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        apiCall={apiCall}
        handleSubmit={handleSubmit}
      />
      <MapInstructions />
      <MapEditor onPolylineReady={setPolyline} loadedTrail={loadedTrail}/>
    </div>
  );
}

export default TrailEditor;

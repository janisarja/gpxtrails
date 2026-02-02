'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TrailForm from '@/src/components/trail-form';
import MapInstructions from '@/src/components/map-instructions.jsx';
import GPXLoader from '@/src/components/gpx-loader';
import TwoColumnLayout from '@/src/components/two-column-layout';

const MapEditor = dynamic(() => import('@/src/components/map-editor'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const Page = () => {
  const [polyline, setPolyline] = useState(null);
  const [loadedTrail, setLoadedTrail] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const postTrail = async (payload) => {
    const res = await fetch('/api/trails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res;
  }

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
      const res = await postTrail(payload);
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
    <TwoColumnLayout 
      left={
        <div>
          <GPXLoader setTrail={setLoadedTrail} />
          <TrailForm 
            buttonText={'Upload Trail'}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            apiCall={postTrail}
            handleSubmit={handleSubmit}
          />
          <MapInstructions />
        </div>
      } 
      right={
        <MapEditor 
          onPolylineReady={setPolyline} 
          loadedTrail={loadedTrail} 
        />
      } 
    />
  );
}

export default Page;

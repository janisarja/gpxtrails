'use client';

import { gpx } from '@tmcw/togeojson';

const GPXLoader = ({ setTrail }) => {
  const handleChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.gpx')) {
      alert('Please upload a GPX file');
      return;
    }

    const text = await file.text();
    const xml = new DOMParser().parseFromString(text, 'text/xml');
    const geojson = gpx(xml).features[0];

    setTrail(geojson);
  };

  return (
    <input
      type="file"
      accept=".gpx"
      onChange={handleChange}
    />
  );
}

export default GPXLoader;

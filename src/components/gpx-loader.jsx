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
    <div className="p-0">
      <label className="relative flex flex-col items-start justify-center w-32 cursor-pointer rounded-md border-2 border-dashed border-gray-300 bg-white/30 px-3 py-2 my-3 mr-3 text-left hover:border-indigo-400 transition-colors">
        <input
          className="sr-only"
          type="file"
          accept=".gpx"
          onChange={handleChange}
        />
        <span className="text-sm text-gray-800">Upload GPX</span>
      </label>
    </div>
  );
}

export default GPXLoader;

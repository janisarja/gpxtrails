'use client';

import { useId } from 'react';
import { gpx } from '@tmcw/togeojson';

const MIN_POINT_DISTANCE_METERS = 10;

const toRadians = (value) => (value * Math.PI) / 180;

const getDistanceMeters = (first, second) => {
  const [lng1, lat1] = first;
  const [lng2, lat2] = second;

  const earthRadiusMeters = 6371000;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLng = toRadians(lng2 - lng1);
  const lat1Radians = toRadians(lat1);
  const lat2Radians = toRadians(lat2);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusMeters * c;
};

const thinCoordinates = (coordinates, minDistanceMeters) => {
  if (!Array.isArray(coordinates) || coordinates.length <= 2) {
    return coordinates;
  }

  const filtered = [coordinates[0]];

  for (let index = 1; index < coordinates.length - 1; index += 1) {
    const point = coordinates[index];
    const lastKept = filtered[filtered.length - 1];

    if (getDistanceMeters(lastKept, point) >= minDistanceMeters) {
      filtered.push(point);
    }
  }

  filtered.push(coordinates[coordinates.length - 1]);

  return filtered;
};

const GPXLoader = ({ setTrail }) => {
  const inputId = useId();
  const labelId = useId();

  const handleChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.gpx')) {
      alert('Please upload a GPX file');
      return;
    }

    const text = await file.text();
    const xml = new DOMParser().parseFromString(text, 'text/xml');
    const parsed = gpx(xml);
    const geojson = parsed.features?.[0];

    if (!geojson || geojson.geometry?.type !== 'LineString') {
      alert('Could not read a GPX track from this file');
      return;
    }

    const coordinates = geojson.geometry.coordinates;

    if (!Array.isArray(coordinates) || coordinates.length < 2) {
      alert('This GPX file does not contain enough track points');
      return;
    }

    const filteredCoordinates = thinCoordinates(coordinates, MIN_POINT_DISTANCE_METERS);
    const filteredGeojson = {
      ...geojson,
      geometry: {
        ...geojson.geometry,
        coordinates: filteredCoordinates,
      },
    };

    setTrail(filteredGeojson);
  };

  return (
    <div className="p-0">
      <label
        htmlFor={inputId}
        className="relative flex flex-col items-start justify-center w-32 cursor-pointer rounded-md border-2 border-dashed border-gray-300 bg-white/30 px-3 py-2 my-3 mr-3 text-left hover:border-indigo-400 transition-colors"
      >
        <span id={labelId} className="text-sm text-gray-800">Upload GPX</span>
      </label>
      <input
        id={inputId}
        className="sr-only"
        type="file"
        accept=".gpx"
        onChange={handleChange}
        aria-labelledby={labelId}
      />
    </div>
  );
}

export default GPXLoader;

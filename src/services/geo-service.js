import { lineString, length, points, center as turfCenter } from '@turf/turf';

export const computeTrailMetrics = (geojson) => {
  const coords = geojson.geometry.coordinates;

  // Calculate total distance
  const coordsLineString = lineString(coords);
  const distance_km = length(coordsLineString, { units: 'kilometers' });

  // Calculate center point
  const coordsPoints = points(coords);
  const center = turfCenter(coordsPoints);

  return { distance_km, center };
}

const turf = require('@turf/turf');

const computeTrailMetrics = (geojson) => {
  const coords = geojson.geometry.coordinates;

  // Calculate total distance
  const coordsLineString = turf.lineString(coords);
  const distance_km = turf.length(coordsLineString, { units: 'kilometers' });

  // Calculate center point
  const coordsPoints = turf.points(coords);
  const center = turf.center(coordsPoints);

  return { distance_km, center };
}

module.exports = { computeTrailMetrics };

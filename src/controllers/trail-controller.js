import Trail from '../models/trail';
import { computeTrailMetrics } from '../services/geo-service';

export const createTrail = async (body) => {
  try {
    const { name, description, geojson } = body;
    const { distance_km, center } = computeTrailMetrics(geojson);

    const trail = await Trail.create({ name, description, distance_km, center, geojson });
    return trail;
  } catch (err) {
    console.error(err);
    throw new Error(JSON.stringify({ error: err.message }), { status: 500 } );
  }
}

export const getAllTrails = async () => {
  try {
    const trails = await Trail.findAll({
      order: [['createdAt', 'DESC']],
    });
    return trails;
  } catch (err) {
    console.error(err);
    throw new Error(JSON.stringify({ error: err.message }), { status: 500 } );
  }
}

export const getTrailById = async (id) => {
  try {
    const trail = await Trail.findByPk(id);
    if (!trail) throw new Error('Trail not found', { status: 404 } );
    return trail;
  } catch (err) {
    console.error(err);
    throw new Error(JSON.stringify({ error: err.message }), { status: 500 } );
  }
}

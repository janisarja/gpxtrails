const Trail = require('../models/Trail');
const { computeTrailMetrics } = require('../services/geoService');

const createTrail = async (req, res) => {
  try {
    const { name, description, geojson } = req.body;
    const { distance_km, center } = computeTrailMetrics(geojson);

    const trail = await Trail.create({ name, description, distance_km, center, geojson });
    
    res.status(201).json(trail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create trail' });
  }
}

const getAllTrails = async (req, res) => {
  try {
    const trails = await Trail.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(trails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trails' });
  }
}

const getTrailById = async (req, res) => {
  try {
    const trail = await Trail.findByPk(req.params.id);
    if (!trail) res.status(404).json({ error: 'Trail not found' });
    res.json(trail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trail' });
  }
}

module.exports = { createTrail, getAllTrails, getTrailById };

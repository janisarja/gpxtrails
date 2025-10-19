const express = require('express');
const Trail = require('../models/Trail');
const router = express.Router();

// POST /api/trails
router.post('/', async (req, res) => {
  try {
    const { name, description, distance_km, geojson } = req.body;
    const trail = await Trail.create({ name, description, distance_km, geojson });
    res.status(201).json(trail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create trail' });
  }
});

// GET /api/trails
router.get('/', async (req, res) => {
  try {
    const trails = await Trail.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(trails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trails' });
  }
});

// GET /api/trails:id
router.get('/:id', async (req, res) => {
  try {
    const trail = await Trail.findByPk(req.params.id);
    if (!trail) res.status(404).json({ error: 'Trail not found' });
    res.json(trail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trail' });
  }
});

module.exports = router;

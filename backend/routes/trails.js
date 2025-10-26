const express = require('express');
const router = express.Router();
const { createTrail, getAllTrails, getTrailById } = require('../controllers/trailController');

// POST /api/trails
router.post('/', createTrail);

// GET /api/trails
router.get('/', getAllTrails);

// GET /api/trails:id
router.get('/:id', getTrailById);

module.exports = router;

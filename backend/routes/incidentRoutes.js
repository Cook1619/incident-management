const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { cacheMiddleware } = require('../middleware/cache');

// Cache duration: 60 minutes (3600 seconds)
const CACHE_DURATION = 3600;

// GET all incidents (with caching)
router.get('/', cacheMiddleware(CACHE_DURATION), incidentController.getAllIncidents);

// GET single incident by ID (with caching)
router.get('/:id', cacheMiddleware(CACHE_DURATION), incidentController.getIncidentById);

// POST create new incident
router.post('/', incidentController.createIncident);

// PUT update incident
router.put('/:id', incidentController.updateIncident);

// DELETE incident
router.delete('/:id', incidentController.deleteIncident);

module.exports = router;

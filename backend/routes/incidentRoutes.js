const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// GET all incidents
router.get('/', incidentController.getAllIncidents);

// GET single incident by ID
router.get('/:id', incidentController.getIncidentById);

// POST create new incident
router.post('/', incidentController.createIncident);

// PUT update incident
router.put('/:id', incidentController.updateIncident);

// DELETE incident
router.delete('/:id', incidentController.deleteIncident);

module.exports = router;

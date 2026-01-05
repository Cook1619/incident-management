const Incident = require('../models/incidentModel');

// Get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.getAll();
    res.json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching incidents' });
  }
};

// Get incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.getById(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.json(incident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching incident' });
  }
};

// Create new incident
exports.createIncident = async (req, res) => {
  try {
    const newIncident = await Incident.create(req.body);
    res.status(201).json(newIncident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating incident' });
  }
};

// Update incident
exports.updateIncident = async (req, res) => {
  try {
    const updatedIncident = await Incident.update(req.params.id, req.body);
    if (!updatedIncident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.json(updatedIncident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating incident' });
  }
};

// Delete incident
exports.deleteIncident = async (req, res) => {
  try {
    await Incident.delete(req.params.id);
    res.json({ message: 'Incident deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting incident' });
  }
};

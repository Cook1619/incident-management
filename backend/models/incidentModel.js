const pool = require('../config/database');

class Incident {
  // Get all incidents
  static async getAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM incidents ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get incident by ID
  static async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM incidents WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new incident
  static async create(incidentData) {
    const { number, short_description, description, priority, status, assigned_to, category } = incidentData;
    try {
      const result = await pool.query(
        `INSERT INTO incidents 
        (number, short_description, description, priority, status, assigned_to, category, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
        RETURNING *`,
        [number, short_description, description, priority, status, assigned_to, category]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update incident
  static async update(id, incidentData) {
    const { short_description, description, priority, status, assigned_to, category } = incidentData;
    try {
      const result = await pool.query(
        `UPDATE incidents 
        SET short_description = $1, description = $2, priority = $3, 
            status = $4, assigned_to = $5, category = $6, updated_at = NOW()
        WHERE id = $7 
        RETURNING *`,
        [short_description, description, priority, status, assigned_to, category, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete incident
  static async delete(id) {
    try {
      await pool.query('DELETE FROM incidents WHERE id = $1', [id]);
      return { message: 'Incident deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Incident;

const pool = require('../db/pg');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS resources (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT
    )
  `);
};

createTable();

module.exports = {
  getAll: async () => {
    const res = await pool.query('SELECT * FROM resources');
    return res.rows;
  },
  getById: async (id) => {
    const res = await pool.query('SELECT * FROM resources WHERE id=$1', [id]);
    return res.rows[0];
  },
  create: async (data) => {
    const res = await pool.query(
      'INSERT INTO resources(name, description) VALUES($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return res.rows[0];
  },
  update: async (id, data) => {
    const res = await pool.query(
      'UPDATE resources SET name=$1, description=$2 WHERE id=$3 RETURNING *',
      [data.name, data.description, id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    const res = await pool.query('DELETE FROM resources WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }
};

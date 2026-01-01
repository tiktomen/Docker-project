const pgModel = require('../models/pgModel');

async function pgRoutes(fastify) {
  fastify.get('/api/pg/resources', async () => {
    return await pgModel.getAll();
  });

  fastify.get('/api/pg/resources/:id', async (req) => {
    return await pgModel.getById(req.params.id);
  });

  fastify.post('/api/pg/resources', async (req) => {
    return await pgModel.create(req.body);
  });

  fastify.put('/api/pg/resources/:id', async (req) => {
    return await pgModel.update(req.params.id, req.body);
  });

  fastify.delete('/api/pg/resources/:id', async (req) => {
    return await pgModel.delete(req.params.id);
  });
}

module.exports = pgRoutes;

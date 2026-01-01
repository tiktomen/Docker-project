const Resource = require('../models/mongoModel');

async function mongoRoutes(fastify) {
  fastify.get('/api/mongo/resources', async () => {
    return await Resource.find();
  });

  fastify.get('/api/mongo/resources/:id', async (req) => {
    return await Resource.findById(req.params.id);
  });

  fastify.post('/api/mongo/resources', async (req) => {
    const resource = new Resource(req.body);
    return await resource.save();
  });

  fastify.put('/api/mongo/resources/:id', async (req) => {
    return await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
  });

  fastify.delete('/api/mongo/resources/:id', async (req) => {
    return await Resource.findByIdAndDelete(req.params.id);
  });
}

module.exports = mongoRoutes;

async function routes(fastify, options) {
  let resources = [];

  fastify.get('/api/resources', async (request, reply) => {
    return resources;
  });

  fastify.get('/api/resources/:id', async (request, reply) => {
    const { id } = request.params;
    const resource = resources.find(r => r.id === parseInt(id));
    if (!resource) return reply.status(404).send({ error: 'Not found' });
    return resource;
  });

  fastify.post('/api/resources', async (request, reply) => {
    const { id, name } = request.body;
    if (!id || !name) return reply.status(400).send({ error: 'Invalid data' });
    resources.push({ id, name });
    return { message: 'Created', resource: { id, name } };
  });

  fastify.put('/api/resources/:id', async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;
    const resource = resources.find(r => r.id === parseInt(id));
    if (!resource) return reply.status(404).send({ error: 'Not found' });
    resource.name = name;
    return { message: 'Updated', resource };
  });

  fastify.delete('/api/resources/:id', async (request, reply) => {
    const { id } = request.params;
    const index = resources.findIndex(r => r.id === parseInt(id));
    if (index === -1) return reply.status(404).send({ error: 'Not found' });
    resources.splice(index, 1);
    return { message: 'Deleted' };
  });
}

// 🔑 Експорт функції, а не об’єкта
module.exports = routes;

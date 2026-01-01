const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors')
require('dotenv').config();

fastify.register(fastifyCors, { origin: '*' })


// Роутинг
fastify.register(require('./routes/pgRoutes'));
fastify.register(require('./routes/mongoRoutes'));

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

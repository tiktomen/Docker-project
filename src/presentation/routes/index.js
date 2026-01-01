async function patchRoutes(fastify) {
    fastify.register(require("./client.routes"));
    fastify.register(require("./product.routes"));
    fastify.register(require("./order.routes"));
    fastify.register(require("./auth.routes"));
}

module.exports = patchRoutes;

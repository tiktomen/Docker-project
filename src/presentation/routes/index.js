async function patchRoutes(fastify) {
    fastify.register(require("./user.routes"));
    fastify.register(require("./product.routes"));
    fastify.register(require("./order.routes"));
}

module.exports = patchRoutes;

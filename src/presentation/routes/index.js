async function patchRoutes(fastify) {
    fastify.register(baseRoutes);

    fastify.register(require("./client.routes"));
    fastify.register(require("./product.routes"));
    fastify.register(require("./order.routes"));
    fastify.register(require("./auth.routes"));
}

async function baseRoutes(fastify) {
    fastify.get("/api", async () => {
        return {
            status: "ok",
            env: process.env.NODE_ENV,
        };
    });
}

module.exports = patchRoutes;

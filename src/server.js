const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
require("dotenv").config();

const { initPg } = require("./infrastructure/db/pg");
const buildContext = require("./context/context");
const patchRoutes = require("./presentation/routes/index");
const authMiddleware = require("./middleware/auth.middleware");

const { pingRedis } = require("./adapters/redis");

fastify.register(require("@fastify/cookie"));
fastify.register(require("@fastify/sensible"));
fastify.register(require("@fastify/request-context"));
fastify.register(require("@fastify/auth"));

fastify.register(fastifyCors, { origin: "*" });

fastify.register(fastifySwagger, {
    swagger: {
        info: {
            title: "API documentation",
            description: "Fastify + Mongo + PG API",
            version: "1.0.0",
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
});

fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
        docExpansion: "list",
        deepLinking: false,
    },
    staticCSP: true,
});

const start = async () => {
    try {
        await pingRedis();

        await initPg();
        await buildContext(fastify);
        await authMiddleware(fastify);
        patchRoutes(fastify);

        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server running on http://localhost:3000");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

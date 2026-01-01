async function clientRoutes(fastify) {
    const { client } = fastify.actions;

    // fastify.addHook("preHandler", async (req) => {
    //     if (["GET", "POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    //         await fastify.authenticate(req);
    //     }
    // });

    fastify.get(
        "/api/mongo/clients/:id",
        {
            schema: {
                tags: ["Client"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return client.getById.execute(req.params.id);
        }
    );

    fastify.get(
        "/api/mongo/clients",
        {
            schema: {
                tags: ["Client"],
                querystring: {
                    type: "object",
                    properties: {
                        page: {
                            type: "integer",
                            minimum: 1,
                            default: 1,
                            description: "Номер сторінки",
                        },
                        limit: {
                            type: "integer",
                            minimum: 1,
                            maximum: 100,
                            default: 10,
                            description: "Кількість елементів на сторінку",
                        },
                        search: {
                            type: "string",
                            description: "Пошук за ім'ям або email",
                        },
                    },
                },
            },
        },
        async (req) => {
            const { page, limit, search } = req.query;
            return client.getAll.execute({ page, limit, search });
        }
    );

    fastify.post(
        "/api/mongo/clients",
        {
            schema: {
                tags: ["Client"],
                body: {
                    type: "object",
                    required: ["name", "email"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        role: { type: "string", enum: ["user", "admin"] },
                    },
                },
            },
        },
        async (req) => {
            return client.create.execute(req.body);
        }
    );

    fastify.put(
        "/api/mongo/clients/:id",
        {
            schema: {
                tags: ["Client"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
                body: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        role: { type: "string", enum: ["user", "admin"] },
                    },
                },
            },
        },
        async (req) => {
            return client.update.execute(req.params.id, req.body);
        }
    );

    fastify.delete(
        "/api/mongo/clients/:id",
        {
            schema: {
                tags: ["Client"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return client.delete.execute(req.params.id);
        }
    );
}

module.exports = clientRoutes;

async function userRoutes(fastify) {
    const { user } = fastify.actions;

    fastify.get(
        "/api/mongo/users/:id",
        {
            schema: {
                tags: ["User"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return user.getById.execute(req.params.id);
        }
    );

    fastify.get(
        "/api/mongo/users",
        {
            schema: {
                tags: ["User"],
            },
        },
        async () => {
            return user.getAll.execute();
        }
    );

    fastify.post(
        "/api/mongo/users",
        {
            schema: {
                tags: ["User"],
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
            return user.create.execute(req.body);
        }
    );

    fastify.put(
        "/api/mongo/users/:id",
        {
            schema: {
                tags: ["User"],
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
            return user.update.execute(req.params.id, req.body);
        }
    );

    fastify.delete(
        "/api/mongo/users/:id",
        {
            schema: {
                tags: ["User"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return user.delete.execute(req.params.id);
        }
    );
}

module.exports = userRoutes;

async function productRoutes(fastify) {
    const { product } = fastify.actions;

    // fastify.addHook("preHandler", async (req) => {
    //     if (["GET", "POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    //         await fastify.authenticate(req);
    //     }
    // });

    fastify.get(
        "/api/mongo/products/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return product.getById.execute(req.params.id);
        }
    );

    fastify.post(
        "/api/mongo/products",
        {
            schema: {
                tags: ["Product"],
                body: {
                    type: "object",
                    required: ["name", "price", "stock"],
                    properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        stock: { type: "integer", minimum: 0 },
                    },
                },
            },
        },
        async (req) => {
            return product.create.execute(req.body);
        }
    );

    fastify.put(
        "/api/mongo/products/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
                body: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        stock: { type: "integer", minimum: 0 },
                    },
                },
            },
        },
        async (req) => {
            return product.update.execute(req.params.id, req.body);
        }
    );

    fastify.delete(
        "/api/mongo/products/:id",
        {
            schema: {
                tags: ["Product"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return product.delete.execute(req.params.id);
        }
    );
}

module.exports = productRoutes;

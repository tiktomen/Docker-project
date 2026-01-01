async function orderRoutes(fastify) {
    const { order } = fastify.actions;

    fastify.post(
        "/api/mongo/orders",
        {
            schema: {
                tags: ["Order"],
                body: {
                    type: "object",
                    required: ["customerId", "items", "totalPrice"],
                    properties: {
                        customerId: { type: "string" },
                        status: {
                            type: "string",
                            enum: ["pending", "completed", "cancelled"],
                        },
                        totalPrice: { type: "number" },
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["productId", "quantity", "price"],
                                properties: {
                                    productId: { type: "string" },
                                    quantity: { type: "integer", minimum: 1 },
                                    price: { type: "number" },
                                },
                            },
                        },
                    },
                },
                response: {
                    201: { type: "object" },
                },
            },
        },
        async (req, reply) => {
            const orderEntity = await order.create.execute(req.body);
            reply.code(201).send(orderEntity);
        }
    );

    fastify.get(
        "/api/mongo/orders/:id",
        {
            schema: {
                tags: ["Order"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: {
                        id: { type: "string" },
                    },
                },
            },
        },
        async (req) => {
            return order.getById.execute(req.params.id);
        }
    );

    fastify.put(
        "/api/mongo/orders/:id",
        {
            schema: {
                tags: ["Order"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
                body: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            enum: ["pending", "completed", "cancelled"],
                        },
                        totalPrice: { type: "number" },
                    },
                },
            },
        },
        async (req) => {
            return order.update.execute(req.params.id, req.body);
        }
    );

    fastify.delete(
        "/api/mongo/orders/:id",
        {
            schema: {
                tags: ["Order"],
                params: {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                },
            },
        },
        async (req) => {
            return order.delete.execute(req.params.id);
        }
    );
}

module.exports = orderRoutes;

async function authRoutes(fastify) {
    const { auth } = fastify.actions;
    const { sessionRepository } = fastify.repositories;

    fastify.post(
        "/auth/register",
        {
            schema: {
                tags: ["Auth"],
                body: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", minLength: 3 },
                        password: { type: "string", minLength: 6 },
                    },
                },
            },
        },
        async (req) => {
            return auth.register.execute(req.body);
        }
    );

    fastify.post(
        "/auth/login",
        {
            schema: {
                tags: ["Auth"],
                body: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", minLength: 3 },
                        password: { type: "string", minLength: 6 },
                    },
                },
            },
        },
        async (req, reply) => {
            const session = await auth.login.execute(req.body);

            reply.setCookie("sessionId", session.id, {
                httpOnly: true,
                path: "/",
            });

            return { success: true };
        }
    );

    fastify.get(
        "/auth/info",
        {
            preHandler: fastify.authenticate,
            schema: {
                tags: ["Auth"],
            },
        },
        async (req) => {
            return {
                userId: req.requestContext.get("userId"),
            };
        }
    );

    fastify.post(
        "/auth/logout",
        {
            schema: {
                tags: ["Auth"],
            },
        },
        async (req, reply) => {
            const sessionId = req.cookies.sessionId;
            if (sessionId) await sessionRepository.delete(sessionId);

            reply.clearCookie("sessionId");
            return { success: true };
        }
    );
}

module.exports = authRoutes;

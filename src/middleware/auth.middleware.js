async function authMiddleware(fastify) {
    fastify.decorate("authenticate", async (req) => {
        const sessionId = req.cookies.sessionId;
        if (!sessionId) throw fastify.httpErrors.unauthorized();

        const session = await fastify.repositories.sessionRepository.getById(
            sessionId
        );
        if (!session || session.isExpired())
            throw fastify.httpErrors.unauthorized();

        req.requestContext.set("userId", session.userId);
    });
}

module.exports = authMiddleware;

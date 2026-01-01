const { redis } = require("../../adapters/redis");

const CACHE_TTL = 60; // Секунди

function buildClientsCacheKey({ page, limit, search }) {
    return `clients:list:${page}:${limit}:${(search || "")
        .trim()
        .toLowerCase()}`;
}

async function invalidateClientsCache() {
    try {
        const keys = await redis.keys("clients:list:*");
        if (keys.length) {
            await redis.del(...keys);
            console.log(`Invalidated ${keys.length} cache keys`);
        }
    } catch (error) {
        console.error("Cache invalidation error:", error);
    }
}

class ClientService {
    constructor(clientRepository) {
        this.clients = clientRepository;
    }

    async getById(id) {
        const client = await this.clients.getById(id);
        if (!client) throw new Error("Client not found");
        return client;
    }

    async getByEmail(email) {
        const client = await this.clients.getByEmail(email);
        if (!client) throw new Error("Client not found");
        return client;
    }

    async getAll(options = {}) {
        const page = Number(options.page) || 1;
        const limit = Number(options.limit) || 10;
        const search = options.search || "";

        const cacheKey = buildClientsCacheKey({ page, limit, search });

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`Cache HIT for key: ${cacheKey}`);
                return JSON.parse(cached);
            }
            console.log(`Cache MISS for key: ${cacheKey}`);
        } catch (error) {
            console.error("Redis GET error:", error);
        }

        const result = await this.clients.getAll({ page, limit, search });

        const response = {
            items: result.data,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
        };

        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(response));
            console.log(`Cached key: ${cacheKey} with TTL: ${CACHE_TTL}s`);
        } catch (error) {
            console.error("Redis SET error:", error);
        }

        return response;
    }

    async create(data) {
        const result = this.clients.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await invalidateClientsCache();

        return result;
    }

    async update(id, data) {
        const client = await this.getById(id);
        if (data.email) client.updateEmail(data.email);
        client.updatedAt = new Date();
        const result = this.clients.update(client);

        await invalidateClientsCache();

        return result;
    }

    async delete(id) {
        await this.getById(id);
        await this.clients.delete(id);

        await invalidateClientsCache();
    }
}

module.exports = ClientService;

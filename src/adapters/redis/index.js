const Redis = require("ioredis");

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

async function pingRedis() {
    const res = await redis.ping();
    console.log("Redis PING:", res);
}

module.exports = {
    redis,
    pingRedis,
};

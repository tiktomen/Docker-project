const { redis } = require("../../adapters/redis");

const PRODUCT_CACHE_TTL = 300; // 5 хвилин

function buildProductCacheKey(id) {
    return `product:${id}`;
}

class ProductService {
    constructor(productRepository) {
        this.products = productRepository;
    }

    async getById(id) {
        const cacheKey = buildProductCacheKey(id);

        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }

        const product = await this.products.getById(id);
        if (!product) throw new Error("Product not found");

        await redis.set(
            cacheKey,
            JSON.stringify(product),
            "EX",
            PRODUCT_CACHE_TTL
        );

        return product;
    }

    async getAll() {
        return await this.products.getAll();
    }

    async create(data) {
        return await this.products.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id, data) {
        const product = await this.getById(id);

        if (data.price !== undefined) product.updatePrice(data.price);
        if (data.stock !== undefined)
            product.updateStock(data.stock - product.stock);

        product.updatedAt = new Date();
        const result = await this.products.update(product);

        await redis.del(`product:${id}`);

        return result;
    }

    async delete(id) {
        await this.getById(id);
        await this.products.delete(id);

        await redis.del(`product:${id}`);
    }
}

module.exports = ProductService;

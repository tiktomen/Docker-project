const test = require("node:test");
const assert = require("node:assert");

const ProductService = require("../../src/domain/services/product.service");
const Product = require("../../src/domain/entities/product");

test("ProductService.getById returns product", async () => {
    const repo = {
        getById: async () => new Product("1", "Phone", 500, 10),
    };

    const service = new ProductService(repo);

    const result = await service.getById("1");

    assert.strictEqual(result.name, "Phone");
});

test("ProductService.getById throws if not found", async () => {
    const repo = {
        getById: async () => null,
    };

    const service = new ProductService(repo);

    await assert.rejects(async () => service.getById("1"), /Product not found/);
});

test("ProductService.update changes price", async () => {
    const product = new Product("1", "Phone", 500, 10);

    const repo = {
        getById: async () => product,
        update: async () => product,
    };

    const service = new ProductService(repo);

    const result = await service.update("1", { price: 700 });

    assert.strictEqual(result.price, 700);
});

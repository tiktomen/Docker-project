const test = require("node:test");
const assert = require("node:assert");

const OrderService = require("../../src/domain/services/order.service");
const Product = require("../../src/domain/entities/product");
const Client = require("../../src/domain/entities/client");

test("OrderService.create calculates total price", async () => {
    const ordersRepo = {
        create: async (order) => order,
    };

    const clientsRepo = {
        getById: async () => new Client({ id: "c1" }),
    };

    const product = new Product("p1", "Book", 50, 10);

    const productsRepo = {
        getById: async () => product,
    };

    const service = new OrderService(ordersRepo, clientsRepo, productsRepo);

    const order = await service.create("c1", [
        { productId: "p1", quantity: 2 },
    ]);

    assert.strictEqual(order.totalPrice, 100);
    assert.strictEqual(product.stock, 8);
});

test("OrderService.create throws if product out of stock", async () => {
    const ordersRepo = { create: async () => {} };
    const clientsRepo = { getById: async () => ({ id: "c1" }) };

    const product = new Product("p1", "Book", 50, 0);

    const productsRepo = {
        getById: async () => product,
    };

    const service = new OrderService(ordersRepo, clientsRepo, productsRepo);

    await assert.rejects(
        async () => service.create("c1", [{ productId: "p1", quantity: 1 }]),
        /Not enough stock/i
    );
});

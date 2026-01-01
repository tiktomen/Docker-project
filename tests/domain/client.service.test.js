const test = require("node:test");
const assert = require("node:assert");

const ClientService = require("../../src/domain/services/client.service");
const Client = require("../../src/domain/entities/client");

test("ClientService.getById returns client", async () => {
    const repo = {
        getById: async (id) =>
            new Client({ id, name: "John", email: "john@test.com" }),
    };

    const service = new ClientService(repo);

    const result = await service.getById("1");

    assert.strictEqual(result.name, "John");
});

test("ClientService.getById throws if client not found", async () => {
    const repo = {
        getById: async () => null,
    };

    const service = new ClientService(repo);

    await assert.rejects(async () => service.getById("1"), /Client not found/);
});

test("ClientService.create sets createdAt", async () => {
    const repo = {
        create: async (data) => data,
    };

    const service = new ClientService(repo);

    const result = await service.create({
        name: "Anna",
        email: "anna@test.com",
    });

    assert.ok(result.createdAt instanceof Date);
});

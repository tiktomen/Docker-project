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

    async getAll() {
        return await this.clients.getAll();
    }

    async create(data) {
        return await this.clients.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id, data) {
        const client = await this.getById(id);
        if (data.email) client.updateEmail(data.email);
        client.updatedAt = new Date();
        return await this.clients.update(client);
    }

    async delete(id) {
        await this.getById(id);
        return await this.clients.delete(id);
    }
}

module.exports = ClientService;

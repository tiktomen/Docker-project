class UpdateClient {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async execute(id, data) {
        return await this.clientService.update(id, data);
    }
}

module.exports = UpdateClient;

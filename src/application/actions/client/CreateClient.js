class CreateClient {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async execute(data) {
        return await this.clientService.create(data);
    }
}

module.exports = CreateClient;

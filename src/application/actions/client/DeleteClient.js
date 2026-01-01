class DeleteClient {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async execute(id) {
        return await this.clientService.delete(id);
    }
}

module.exports = DeleteClient;

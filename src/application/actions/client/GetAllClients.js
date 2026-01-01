class GetAllClients {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async execute(options = {}) {
        return await this.clientService.getAll(options);
    }
}

module.exports = GetAllClients;

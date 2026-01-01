class GetAllClients {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async execute() {
        return await this.clientService.getAll();
    }
}

module.exports = GetAllClients;

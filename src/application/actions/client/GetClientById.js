class GetClientById {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async execute(id) {
        return await this.clientService.getById(id);
    }
}

module.exports = GetClientById;

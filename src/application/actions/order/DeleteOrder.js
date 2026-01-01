class DeleteOrder {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async execute(id) {
        return await this.orderService.delete(id);
    }
}

module.exports = DeleteOrder;

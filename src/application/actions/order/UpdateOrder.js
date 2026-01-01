class UpdateOrder {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async execute(id, newStatus) {
        return await this.orderService.update(id, newStatus);
    }
}

module.exports = UpdateOrder;

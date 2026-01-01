class GetOrderById {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async execute(orderId) {
        return await this.orderService.getById(orderId);
    }
}

module.exports = GetOrderById;

class CreateOrder {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async execute({ customerId, items }) {
        return await this.orderService.create(customerId, items);
    }
}

module.exports = CreateOrder;

const Order = require("../entities/order");

class OrderService {
    constructor(orders, users, products) {
        this.orders = orders;
        this.users = users;
        this.products = products;
    }

    async create(customerId, items) {
        const user = await this.users.getById(customerId);
        if (!user) {
            throw new Error("User not found");
        }

        let totalPrice = 0;

        for (const item of items) {
            const product = await this.products.getById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            if (!product.isInStock()) {
                throw new Error(`Not enough stock`);
            }

            product.decreaseStock(item.quantity);

            totalPrice += product.price * item.quantity;
        }

        const order = new Order({
            customerId,
            items,
            status: "pending",
            totalPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return await this.orders.create(order);
    }

    async update(orderId, newStatus) {
        const order = await this.orders.getById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        order.updateStatus(newStatus);
        order.updatedAt = new Date();

        return await this.orders.update(order);
    }

    async delete(orderId) {
        const order = await this.orders.getById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return await this.orders.delete(orderId);
    }

    async getAll() {
        return await this.orders.getAll();
    }

    async getById(orderId) {
        const order = await this.orders.getById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
}

module.exports = OrderService;

class Order {
    constructor({
        id,
        customerId,
        items,
        status,
        totalPrice,
        createdAt,
        updatedAt,
    }) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.status = status;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalPrice = totalPrice;
    }

    isPending() {
        return this.status === "pending";
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    updateTotalPrice(newTotalPrice) {
        this.totalPrice = newTotalPrice;
    }
}

module.exports = Order;

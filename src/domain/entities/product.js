class Product {
    constructor(id, name, price, stock, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isInStock() {
        return this.stock > 0;
    }

    updatePrice(newPrice) {
        this.price = newPrice;
    }

    updateStock(quantity) {
        this.stock += quantity;
    }

    decreaseStock(quantity) {
        if (quantity > this.stock) {
            throw new Error("Insufficient stock");
        }
        this.stock -= quantity;
    }
}

module.exports = Product;

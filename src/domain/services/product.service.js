class ProductService {
    constructor(productRepository) {
        this.products = productRepository;
    }

    async getById(id) {
        const product = await this.products.getById(id);
        if (!product) throw new Error("Product not found");
        return product;
    }

    async getAll() {
        return await this.products.getAll();
    }

    async create(data) {
        return await this.products.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id, data) {
        const product = await this.getById(id);

        if (data.price !== undefined) product.updatePrice(data.price);
        if (data.stock !== undefined)
            product.updateStock(data.stock - product.stock);

        product.updatedAt = new Date();
        return await this.products.update(product);
    }

    async delete(id) {
        await this.getById(id);
        return await this.products.delete(id);
    }
}

module.exports = ProductService;

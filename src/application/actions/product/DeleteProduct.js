class DeleteProduct {
    constructor(productService) {
        this.productService = productService;
    }

    async execute(id) {
        return await this.productService.delete(id);
    }
}

module.exports = DeleteProduct;

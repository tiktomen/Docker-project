class UpdateProduct {
    constructor(productService) {
        this.productService = productService;
    }

    async execute(id, data) {
        return await this.productService.update(id, data);
    }
}

module.exports = UpdateProduct;

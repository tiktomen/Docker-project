class CreateProduct {
    constructor(productService) {
        this.productService = productService;
    }

    async execute(data) {
        return await this.productService.create(data);
    }
}

module.exports = CreateProduct;

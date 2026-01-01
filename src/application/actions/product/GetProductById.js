class GetProductById {
    constructor(productService) {
        this.productService = productService;
    }

    async execute(id) {
        return await this.productService.getById(id);
    }
}

module.exports = GetProductById;

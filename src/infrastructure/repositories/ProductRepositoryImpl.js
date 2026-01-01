const ProductRepository = require("../../domain/repositories/product.repository");
const Product = require("../../domain/entities/product");
const ProductModel = require("../models/mongo/Product");

class ProductRepositoryImpl extends ProductRepository {
    async getById(id) {
        if (!id) return null;

        const doc = await ProductModel.findById(id).exec();
        if (!doc) return null;

        return new Product(
            doc._id.toString(),
            doc.name,
            doc.price,
            doc.stock,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async create(product) {
        const doc = await ProductModel.create({
            name: product.name,
            price: product.price,
            stock: product.stock,
        });

        return new Product(
            doc._id.toString(),
            doc.name,
            doc.price,
            doc.stock,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async update(product) {
        const doc = await ProductModel.findByIdAndUpdate(
            product.id,
            {
                stock: product.stock,
                price: product.price,
                name: product.name,
            },
            { new: true }
        ).exec();

        if (!doc) return null;

        return new Product(
            doc._id.toString(),
            doc.name,
            doc.price,
            doc.stock,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async delete(id) {
        await ProductModel.findByIdAndDelete(id).exec();
    }

    async getAll() {
        const docs = await ProductModel.find().exec();
        return docs.map(
            (doc) =>
                new Product(
                    doc._id.toString(),
                    doc.name,
                    doc.price,
                    doc.stock,
                    doc.createdAt,
                    doc.updatedAt
                )
        );
    }
}

module.exports = ProductRepositoryImpl;

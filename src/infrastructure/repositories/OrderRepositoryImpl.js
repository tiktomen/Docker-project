const OrderRepository = require("../../domain/repositories/order.repository");
const mongoose = require("../db/mongo");
const Order = require("../../domain/entities/order");
const OrderModel = require("../models/mongo/order.model");

class OrderRepositoryImpl extends OrderRepository {
    async create(order) {
        const doc = await OrderModel.create({
            customer: order.customerId,
            status: order.status,
            totalPrice: order.totalPrice,
            items: order.items.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        });

        return new Order({
            ...order,
            id: doc._id.toString(),
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const doc = await OrderModel.findById(id)
            .populate("items.product")
            .exec();
        if (!doc) return null;

        return new Order({
            id: doc._id.toString(),
            customerId: doc.customer.toString(),
            status: doc.status,
            totalPrice: doc.totalPrice,
            items: doc.items.map((item) => ({
                productId: item.product._id.toString(),
                quantity: item.quantity,
                price: item.price,
            })),
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async getAll() {
        const docs = await OrderModel.find().populate("items.product").exec();

        return docs.map(
            (doc) =>
                new Order({
                    id: doc._id.toString(),
                    customerId: doc.customer.toString(),
                    status: doc.status,
                    totalPrice: doc.totalPrice,
                    items: doc.items.map((item) => ({
                        productId: item.product._id.toString(),
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                })
        );
    }
}

module.exports = OrderRepositoryImpl;

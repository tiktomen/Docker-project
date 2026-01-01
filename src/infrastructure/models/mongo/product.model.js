const mongoose = require("../../db/mongo");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

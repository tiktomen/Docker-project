const mongoose = require("../../db/mongo");

const clientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

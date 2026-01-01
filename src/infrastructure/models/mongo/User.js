const mongoose = require("../../db/mongo");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

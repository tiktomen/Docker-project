const mongoose = require("../../db/mongo");

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;

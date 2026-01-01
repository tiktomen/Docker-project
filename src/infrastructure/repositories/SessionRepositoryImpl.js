const Session = require("../../domain/entities/session");
const SessionModel = require("../models/mongo/session.model");

class SessionRepositoryImpl {
    async create(userId) {
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const doc = await SessionModel.create({
            userId,
            expiresAt,
        });

        return new Session({
            id: doc._id.toString(),
            userId: doc.userId.toString(),
            expiresAt: doc.expiresAt,
            createdAt: doc.createdAt,
        });
    }

    async getById(id) {
        const doc = await SessionModel.findById(id);
        if (!doc) return null;

        return new Session({
            id: doc._id.toString(),
            userId: doc.userId.toString(),
            expiresAt: doc.expiresAt,
            createdAt: doc.createdAt,
        });
    }

    async delete(id) {
        await SessionModel.findByIdAndDelete(id);
    }
}

module.exports = SessionRepositoryImpl;

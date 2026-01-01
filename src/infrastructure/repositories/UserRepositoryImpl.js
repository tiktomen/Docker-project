const UserRepository = require("../../domain/repositories/user.repository");
const User = require("../../domain/entities/user");
const UserModel = require("../models/mongo/User");

class UserRepositoryImpl extends UserRepository {
    async getById(id) {
        if (!id) return null;

        const doc = await UserModel.findById(id).exec();
        if (!doc) return null;

        return new User({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async getByEmail(email) {
        const doc = await UserModel.findOne({ email }).exec();
        if (!doc) return null;

        return new User({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async getAll() {
        const docs = await UserModel.find().exec();
        return docs.map(
            (doc) =>
                new User({
                    id: doc._id.toString(),
                    name: doc.name,
                    email: doc.email,
                    role: doc.role,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                })
        );
    }

    async create(user) {
        const doc = await UserModel.create({
            name: user.name,
            email: user.email,
            role: user.role,
        });

        return new User({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async update(user) {
        const doc = await UserModel.findByIdAndUpdate(
            user.id,
            {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            { new: true }
        ).exec();

        if (!doc) return null;

        return new User({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async delete(id) {
        await UserModel.findByIdAndDelete(id).exec();
    }
}

module.exports = UserRepositoryImpl;

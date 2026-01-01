const bcrypt = require("bcrypt");
const User = require("../../domain/entities/user");
const UserModel = require("../models/mongo/user.model");

class UserRepositoryImpl {
    async create(username, password) {
        const passwordHash = await bcrypt.hash(password, 10);

        const doc = await UserModel.create({
            username,
            passwordHash,
        });

        return new User({
            id: doc._id.toString(),
            username: doc.username,
            passwordHash: doc.passwordHash,
            createdAt: doc.createdAt,
        });
    }

    async findByUsername(username) {
        const doc = await UserModel.findOne({ username });
        if (!doc) return null;

        return new User({
            id: doc._id.toString(),
            username: doc.username,
            passwordHash: doc.passwordHash,
            createdAt: doc.createdAt,
        });
    }
}

module.exports = UserRepositoryImpl;

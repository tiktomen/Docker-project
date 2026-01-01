const ClientRepository = require("../../domain/repositories/client.repository");
const Client = require("../../domain/entities/client");
const ClientModel = require("../models/mongo/client.model");

class ClientRepositoryImpl extends ClientRepository {
    async getById(id) {
        if (!id) return null;

        const doc = await ClientModel.findById(id).exec();
        if (!doc) return null;

        return new Client({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async getByEmail(email) {
        const doc = await ClientModel.findOne({ email }).exec();
        if (!doc) return null;

        return new Client({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async getAll() {
        const docs = await ClientModel.find().exec();
        return docs.map(
            (doc) =>
                new Client({
                    id: doc._id.toString(),
                    name: doc.name,
                    email: doc.email,
                    role: doc.role,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                })
        );
    }

    async create(client) {
        const doc = await ClientModel.create({
            name: client.name,
            email: client.email,
            role: client.role,
        });

        return new Client({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async update(client) {
        const doc = await ClientModel.findByIdAndUpdate(
            client.id,
            {
                name: client.name,
                email: client.email,
                role: client.role,
            },
            { new: true }
        ).exec();

        if (!doc) return null;

        return new Client({
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            role: doc.role,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    async delete(id) {
        await ClientModel.findByIdAndDelete(id).exec();
    }
}

module.exports = ClientRepositoryImpl;

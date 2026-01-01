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

    async getAll(options = {}) {
        const page = Math.max(1, options.page || 1);
        const limit = Math.max(1, Math.min(100, options.limit || 10));
        const search = options.search?.trim() || "";
        const skip = (page - 1) * limit;

        const filter = search
            ? {
                  $or: [
                      { name: { $regex: search, $options: "i" } },
                      { email: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        const [docs, total] = await Promise.all([
            ClientModel.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            ClientModel.countDocuments(filter).exec(),
        ]);

        const clients = docs.map(
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

        return {
            data: clients,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
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

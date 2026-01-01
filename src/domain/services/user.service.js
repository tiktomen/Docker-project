class UserService {
    constructor(userRepository) {
        this.users = userRepository;
    }

    async getById(id) {
        const user = await this.users.getById(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    async getByEmail(email) {
        const user = await this.users.getByEmail(email);
        if (!user) throw new Error("User not found");
        return user;
    }

    async getAll() {
        return await this.users.getAll();
    }

    async create(data) {
        return await this.users.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id, data) {
        const user = await this.getById(id);
        if (data.email) user.updateEmail(data.email);
        user.updatedAt = new Date();
        return await this.users.update(user);
    }

    async delete(id) {
        await this.getById(id);
        return await this.users.delete(id);
    }
}

module.exports = UserService;

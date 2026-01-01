class User {
    constructor({ id, username, passwordHash, createdAt }) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            createdAt: this.createdAt,
        };
    }
}

module.exports = User;

class Session {
    constructor({ id, userId, expiresAt, createdAt }) {
        this.id = id;
        this.userId = userId;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
    }

    isExpired() {
        return this.expiresAt < new Date();
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            expiresAt: this.expiresAt,
            createdAt: this.createdAt,
        };
    }
}

module.exports = Session;

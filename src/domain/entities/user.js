class User {
    constructor({ id, name, email, role, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isAdmin() {
        return this.role === "admin";
    }

    updateEmail(newEmail) {
        this.email = newEmail;
    }
}

module.exports = User;

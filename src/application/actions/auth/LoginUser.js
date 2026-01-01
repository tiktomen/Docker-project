const bcrypt = require("bcrypt");

class LoginUser {
    constructor(userRepo, sessionRepo) {
        this.userRepo = userRepo;
        this.sessionRepo = sessionRepo;
    }

    async execute({ username, password }) {
        const user = await this.userRepo.findByUsername(username);
        if (!user) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) throw new Error("Invalid credentials");

        return this.sessionRepo.create(user.id);
    }
}

module.exports = LoginUser;

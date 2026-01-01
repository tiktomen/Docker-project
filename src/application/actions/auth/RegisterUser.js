class RegisterUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute({ username, password }) {
        return this.userRepo.create(username, password);
    }
}
module.exports = RegisterUser;

class CreateUser {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(data) {
        return await this.userService.create(data);
    }
}

module.exports = CreateUser;

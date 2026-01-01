class UpdateUser {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(id, data) {
        return await this.userService.update(id, data);
    }
}

module.exports = UpdateUser;

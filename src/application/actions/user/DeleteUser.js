class DeleteUser {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(id) {
        return await this.userService.delete(id);
    }
}

module.exports = DeleteUser;

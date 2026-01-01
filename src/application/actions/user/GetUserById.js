class GetUserById {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(id) {
        return await this.userService.getById(id);
    }
}

module.exports = GetUserById;

const UserRepositoryImpl = require("./../infrastructure/repositories/UserRepositoryImpl");
const ProductRepositoryImpl = require("./../infrastructure/repositories/ProductRepositoryImpl");
const OrderRepositoryImpl = require("./../infrastructure/repositories/OrderRepositoryImpl");

const OrderService = require("./../domain/services/order.service");
const UserService = require("./../domain/services/user.service");
const ProductService = require("./../domain/services/product.service");

const CreateUser = require("../application/actions/user/CreateUser");
const GetUserById = require("../application/actions/user/GetUserById");
const GetAllUsers = require("../application/actions/user/GetAllUsers");
const UpdateUser = require("../application/actions/user/UpdateUser");
const DeleteUser = require("../application/actions/user/DeleteUser");

const CreateProduct = require("../application/actions/product/CreateProduct");
const GetProductById = require("../application/actions/product/GetProductById");
const UpdateProduct = require("../application/actions/product/UpdateProduct");
const DeleteProduct = require("../application/actions/product/DeleteProduct");

const CreateOrder = require("../application/actions/order/CreateOrder");
const GetOrderById = require("../application/actions/order/GetOrderById");
const UpdateOrder = require("../application/actions/order/UpdateOrder");
const DeleteOrder = require("../application/actions/order/DeleteOrder");

function buildContext(fastify) {
    const userRepository = new UserRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    const orderRepository = new OrderRepositoryImpl();

    const orderService = new OrderService(
        orderRepository,
        userRepository,
        productRepository
    );
    const userService = new UserService(userRepository);
    const productService = new ProductService(productRepository);

    const userActions = {
        create: new CreateUser(userService),
        getById: new GetUserById(userService),
        getAll: new GetAllUsers(userService),
        update: new UpdateUser(userService),
        delete: new DeleteUser(userService),
    };

    const productActions = {
        create: new CreateProduct(productService),
        getById: new GetProductById(productService),
        update: new UpdateProduct(productService),
        delete: new DeleteProduct(productService),
    };

    const orderActions = {
        create: new CreateOrder(orderService),
        getById: new GetOrderById(orderService),
        update: new UpdateOrder(orderService),
        delete: new DeleteOrder(orderService),
    };

    fastify.decorate("actions", {
        user: userActions,
        product: productActions,
        order: orderActions,
    });

    fastify.decorate("repositories", {
        userRepository,
        productRepository,
        orderRepository,
    });

    fastify.decorate("services", {
        orderService,
        userService,
        productService,
    });
}

module.exports = buildContext;

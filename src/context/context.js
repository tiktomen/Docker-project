const ClientRepositoryImpl = require("./../infrastructure/repositories/ClientRepositoryImpl");
const ProductRepositoryImpl = require("./../infrastructure/repositories/ProductRepositoryImpl");
const OrderRepositoryImpl = require("./../infrastructure/repositories/OrderRepositoryImpl");
const UserRepositoryImpl = require("./../infrastructure/repositories/UserRepositoryImpl");
const SessionRepositoryImpl = require("./../infrastructure/repositories/SessionRepositoryImpl");

const OrderService = require("./../domain/services/order.service");
const ClientService = require("./../domain/services/client.service");
const ProductService = require("./../domain/services/product.service");

const CreateClient = require("../application/actions/client/CreateClient");
const GetClientById = require("../application/actions/client/GetClientById");
const GetAllClients = require("../application/actions/client/GetAllClients");
const UpdateClient = require("../application/actions/client/UpdateClient");
const DeleteClient = require("../application/actions/client/DeleteClient");

const CreateProduct = require("../application/actions/product/CreateProduct");
const GetProductById = require("../application/actions/product/GetProductById");
const UpdateProduct = require("../application/actions/product/UpdateProduct");
const DeleteProduct = require("../application/actions/product/DeleteProduct");

const CreateOrder = require("../application/actions/order/CreateOrder");
const GetOrderById = require("../application/actions/order/GetOrderById");
const UpdateOrder = require("../application/actions/order/UpdateOrder");
const DeleteOrder = require("../application/actions/order/DeleteOrder");

const LoginUser = require("../application/actions/auth/LoginUser");
const RegisterUser = require("../application/actions/auth/RegisterUser");

function buildContext(fastify) {
    const clientRepository = new ClientRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    const orderRepository = new OrderRepositoryImpl();
    const userRepository = new UserRepositoryImpl();
    const sessionRepository = new SessionRepositoryImpl();

    const orderService = new OrderService(
        orderRepository,
        clientRepository,
        productRepository
    );
    const clientService = new ClientService(clientRepository);
    const productService = new ProductService(productRepository);

    const clientActions = {
        create: new CreateClient(clientService),
        getById: new GetClientById(clientService),
        getAll: new GetAllClients(clientService),
        update: new UpdateClient(clientService),
        delete: new DeleteClient(clientService),
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

    const authActions = {
        login: new LoginUser(userRepository, sessionRepository),
        register: new RegisterUser(userRepository),
    };

    fastify.decorate("actions", {
        client: clientActions,
        product: productActions,
        order: orderActions,
        auth: authActions,
    });

    fastify.decorate("repositories", {
        clientRepository,
        productRepository,
        orderRepository,
        userRepository,
        sessionRepository,
    });

    fastify.decorate("services", {
        orderService,
        clientService,
        productService,
    });
}

module.exports = buildContext;

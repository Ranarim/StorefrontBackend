"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const verifyAuth_1 = require("../middleware/verifyAuth");
require('dotenv').config();
const store = new orders_1.Orders();
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const showOrdersByUser = async (req, res) => {
    try {
        const orders = await store.showOrdersByUser(req.params.userId);
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const showProductsByOrderId = async (req, res) => {
    try {
        const products = await store.showProductsByOrderId(req.params.id);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    const order = {
        userId: req.body.userId,
        status: req.body.status
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProductToOrder = async (req, res) => {
    const orderProduct = {
        quantity: req.body.quantity,
        orderid: req.body.orderid,
        productid: req.body.productid
    };
    try {
        const newOrder = await store.addProductToOrder(orderProduct);
        res.json(newOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const ordersRoutes = (app) => {
    app.get("/orders", verifyAuth_1.verifyAuthToken, index);
    app.get("/orders/:userId", verifyAuth_1.verifyAuthToken, showOrdersByUser);
    app.get("/orders/products/:id", verifyAuth_1.verifyAuthToken, showProductsByOrderId);
    app.post("/orders", verifyAuth_1.verifyAuthToken, create);
    app.post("/orders/products", verifyAuth_1.verifyAuthToken, addProductToOrder);
};
exports.default = ordersRoutes;

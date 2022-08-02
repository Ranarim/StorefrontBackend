"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const verifyAuth_1 = require("../middleware/verifyAuth");
const store = new products_1.Products();
const index = async (req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (error) {
        console.log("Handler not working");
        res.status(400);
        res.json(error);
    }
};
const productsRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", verifyAuth_1.verifyAuthToken, create);
};
exports.default = productsRoutes;

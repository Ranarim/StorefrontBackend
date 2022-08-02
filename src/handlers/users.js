"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth_1 = require("../middleware/verifyAuth");
require('dotenv').config();
const store = new users_1.Users();
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(401).json(`Could not get users: ${err}`);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(401).json(`Could not get users: ${err}`);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            pw: req.body.pw,
        };
        const hash = bcrypt_1.default.hashSync(user.pw + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
        user.pw = hash;
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (error) {
        console.log("Handler did not work", error);
        res.status(401);
        res.json(`Invalid token ${error}`);
    }
};
const usersRoutes = (app) => {
    app.get("/users", verifyAuth_1.verifyAuthToken, index);
    app.get("/users/:id", verifyAuth_1.verifyAuthToken, show);
    app.post("/users", verifyAuth_1.verifyAuthToken, create);
};
exports.default = usersRoutes;

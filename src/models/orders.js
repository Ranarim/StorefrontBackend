"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const database_1 = __importDefault(require("../database"));
class Orders {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async showOrdersByUser(id) {
        try {
            const sql = `SELECT * FROM orders WHERE userid=($1)`;
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            console.log("showOrderByUser did not work");
            throw new Error(`Could not find product ${id}. Error: ${error}`);
        }
    }
    async showProductsByOrderId(id) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM orderproduct WHERE orderid=($1) ';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows;
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await database_1.default.query(sql, [o.userId, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (error) {
            console.log("Order model not working");
            throw new Error(`Could not add new order. Error: ${error}`);
        }
    }
    async addProductToOrder(op) {
        try {
            const sql = 'INSERT INTO orderproduct (quantity, orderid, productid) VALUES ($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await database_1.default.query(sql, [op.quantity, op.orderid, op.productid]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (error) {
            console.log("Orderproduct model not working");
            throw new Error(`Could not add new orderproduct. Error: ${error}`);
        }
    }
}
exports.Orders = Orders;

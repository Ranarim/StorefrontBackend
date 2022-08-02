"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class Products {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM products WHERE id=($1)`;
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find product ${id}. Error: ${error}`);
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await database_1.default.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (error) {
            console.log("Product model not working");
            throw new Error(`Could not add new product. Error: ${error}`);
        }
    }
}
exports.Products = Products;

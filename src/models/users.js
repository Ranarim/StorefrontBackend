"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
class Users {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get user. Error: ${error}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, email, pw) VALUES ($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const values = [u.firstname, u.lastname, u.email, u.pw];
            const result = await conn.query(sql, values);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            console.log("controller did not work");
            throw new Error(`Could not add new user. Error: ${error}`);
        }
    }
}
exports.Users = Users;

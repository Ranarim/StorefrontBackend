"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
let server;
describe('Order Handler', () => {
    server = server_1.default.listen();
    test("Unauthorized to GET /orders without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/orders");
        expect(result.statusCode).toBe(401);
    });
    test("Unauthorized to GET /orders/:userId without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/orders/1");
        expect(result.statusCode).toBe(401);
    });
    test(" Unauthorized to GET /orders/products/:id without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/orders/products/1");
        expect(result.statusCode).toBe(401);
    });
    test("Unauthorized to POST /orders without a token", async () => {
        const result = await (0, supertest_1.default)(server).post("/orders").send({
            userId: 1,
            status: "registered"
        });
        expect(result.statusCode).toBe(401);
    });
    test("Unauthorized to POST /orders/products without a token", async () => {
        const response = await (0, supertest_1.default)(server).post("/orders/products").send({
            quantity: 5,
            orderid: 3,
            productid: 4
        });
    });
    server.close();
});

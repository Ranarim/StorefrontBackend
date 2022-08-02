"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
let server;
describe('Product Handler', () => {
    server = server_1.default.listen();
    test("Authorized to GET /products without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/products");
        expect(result.statusCode).toBe(200);
    });
    test("Authorized to GET /products/:id without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/products/1");
        expect(result.statusCode).toBe(200);
    });
    test("Unauthorized to POST /products without a token", async () => {
        const result = await (0, supertest_1.default)(server).post("/products").send({
            name: "Testprodukt",
            price: 9999
        });
        expect(result.statusCode).toBe(401);
    });
    server.close();
});

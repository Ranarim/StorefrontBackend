"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
let server;
describe('User Handler', () => {
    server = server_1.default.listen();
    test("Unauthorized to GET /users without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/users");
        expect(result.statusCode).toBe(401);
    });
    test("Unauthorized to GET /users/:id without a token", async () => {
        const result = await (0, supertest_1.default)(server).get("/users/1");
        expect(result.statusCode).toBe(401);
    });
    test("Unauthorized to POST /users without a token", async () => {
        const result = await (0, supertest_1.default)(server).post("/users").send({
            firstname: "Max",
            lastname: "Mustermann",
            email: "max.mustermann@gmail.com",
            pw: "geheim"
        });
        expect(result.statusCode).toBe(401);
    });
    server.close();
});

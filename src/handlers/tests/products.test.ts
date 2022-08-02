import request from 'supertest'
import app from '../../server'
import { Server } from 'http'

let server: Server

describe('Product Handler', () => {
	server = app.listen()
    test("Authorized to GET /products without a token", async() => {
        const result = await request(server).get("/products")
        expect(result.statusCode).toBe(200)
    })
    test("Authorized to GET /products/:id without a token", async() => {
        const result = await request(server).get("/products/1")
        expect(result.statusCode).toBe(200)
    })
    test("Unauthorized to POST /products without a token", async() => {
        const result = await request(server).post("/products").send({
            name: "Testprodukt",
            price: 9999
        })
        expect(result.statusCode).toBe(401)
    })
    server.close()
})
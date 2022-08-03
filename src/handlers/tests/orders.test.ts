import request from 'supertest'
import app from '../../server'
import { Server } from 'http'

let server: Server

describe('Order Handler', () => {
	server = app.listen()
    test("Unauthorized to GET /orders without a token", async() => {
        const result = await request(server).get("/orders")
        expect(result.statusCode).toBe(401)
    })
    test("Unauthorized to GET /orders/:userId without a token", async() => {
        const result = await request(server).get("/orders/1")
        expect(result.statusCode).toBe(401)
    })
    test(" Unauthorized to GET /orders/products/:id without a token", async() => {
        const result = await request(server).get("/orders/products/1")
        expect(result.statusCode).toBe(401)
    })
    test("Unauthorized to POST /orders without a token", async() => {
        const result = await request(server).post("/orders").send({
            userId: 1,
            status: "registered"
        })
        expect(result.statusCode).toBe(401)
    })
    test("Unauthorized to POST /orders/products without a token", async() => {
        const response = await request(server).post("/orders/products").send({
            quantity: 5,
            orderid: 3,
            productid: 4
        })
    })

    server.close()
})


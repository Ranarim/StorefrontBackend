import request from 'supertest'
import app from '../../server'
import { Server } from 'http'

let server: Server

describe('User Handler', () => {
	server = app.listen()
    test("Unauthorized to GET /users without a token", async() => {
        const result = await request(server).get("/users")
        expect(result.statusCode).toBe(401)
    })
    test("Unauthorized to GET /users/:id without a token", async() => {
        const result = await request(server).get("/users/1")
        expect(result.statusCode).toBe(401)
    })
   
    test("Unauthorized to POST /users without a token", async() => {
        const result = await request(server).post("/users").send({
            firstname: "Max",
            lastname: "Mustermann",
            email: "max.mustermann@gmail.com",
            pw: "geheim"
        })
        expect(result.statusCode).toBe(401)
    })
    server.close()
})
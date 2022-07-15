import express, {Response, Request} from "express"
import {Product, Products} from "../models/products"
import jwt from "jsonwebtoken"

const store = new Products()

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        res.status(401)
    }
}

const index = async(req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async(req: Request, res: Response) => {
    const product = await store.show(req.body.id)
    res.json(product)
}

const create = async(req: Request, res: Response) => {
    try {
        const product = {
            id: req.body.id, 
            name: req.body.name, 
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)

    } catch (error) {
        throw new Error(`Error: ${error}Creating a product did not work.`)
    }
}

const productsRoutes = (app: express.Application) => {
    app.get("/products", verifyAuthToken, index)
    app.get("/products/:id", verifyAuthToken, show)
    app.post("products", verifyAuthToken, create)
}

export default productsRoutes
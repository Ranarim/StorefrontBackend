import express, {Response, Request} from "express"
import {Product, Products} from "../models/products"
import { verifyAuthToken } from "../middleware/verifyAuth"

const store = new Products()

const index = async(req: Request, res: Response): Promise <void> => {
    const products = await store.index()
    res.json(products)
}

const show = async(req: Request, res: Response): Promise <void> => {
    const product = await store.show(req.params.id)
    res.json(product)
}

const create = async(req: Request, res: Response): Promise <void> => {
    const product: Product = {
        name: req.body.name, 
        price: req.body.price,
    }

    try {
        const newProduct = await store.create(product)
        res.json(newProduct)

    } catch (error) {
        console.log("Handler not working")
        res.status(400)
        res.json(error)
    }
}

const productsRoutes = (app: express.Application) => {
    app.get("/products", index)
    app.get("/products/:id", show)
    app.post("/products", verifyAuthToken, create)
}

export default productsRoutes
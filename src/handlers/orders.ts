import express, {Response, Request} from "express"
import {Order, Orders, OrderProduct} from "../models/orders"
import { verifyAuthToken } from "../middleware/verifyAuth"


require('dotenv').config()

const store = new Orders()

const index = async(req: Request,res: Response): Promise <void> => {
    try {
    const orders = await store.index()
    res.json(orders) 
    } catch (error) {
        res.status(400)
		res.json(error)
    }
}

const showOrdersByUser = async(req: Request,res: Response): Promise <void> => {
    try {
    const orders = await store.showOrdersByUser(req.params.userId)
    res.json(orders) } catch (error) {
        res.status(400)
		res.json(error)
    }
}

const showProductsByOrderId = async(req: Request,res: Response): Promise <void> => {
    try {
        const products = await store.showProductsByOrderId(req.params.id)
    res.json(products) } catch (error) {
        res.status(400)
		res.json(error)
    }
}

const create = async(req: Request,res: Response): Promise <void> => {
    const order: Order = {
        userId: req.body.userId,
        status: req.body.status
    }

    try {
        const newOrder = await store.create(order)
        res.json(newOrder)

    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addProductToOrder = async(req: Request,res: Response): Promise <void> => {
    const orderProduct: OrderProduct = {
        quantity: req.body.quantity,
        orderid: req.body.orderid,
        productid: req.body.productid
    }

    try {
        const newOrder = await store.addProductToOrder(orderProduct)
        res.json(newOrder)

    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const ordersRoutes = (app: express.Application) => {
    app.get("/orders", verifyAuthToken, index)
    app.get("/orders/:userId", verifyAuthToken, showOrdersByUser)
    app.get("/orders/products/:id", verifyAuthToken, showProductsByOrderId)
    app.post("/orders", verifyAuthToken, create)
    app.post("/orders/products", verifyAuthToken, addProductToOrder)
}

export default ordersRoutes


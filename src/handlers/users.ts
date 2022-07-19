import express, {Response, Request} from "express"
import {User,Users} from "../models/users"
import jwt from "jsonwebtoken"

const store = new Users()
const verifyAuthToken = (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    } catch (error) {
        res.status(401)
    }
}

const index = (req: Request, res: Response) => {

    const users = store.index()
    res.json(users)
}

const show = (req: Request, res: Response) => {
    //Authentication with JWT
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }


    const user = store.show(req.body.id)
    res.json(user)
}

const create = async(req: Request, res: Response) => {
    const user:User = {
        id: req.body.id, 
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        pw: req.body.pw,
    }
    try {
        const newUser = await store.create(user)
        res.json(newUser) 
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const usersRoutes = (app: express.Application) => {
    app.get("/users", index)
    app.get("/users/:id", show)
    app.post("/users", create)
}

export default usersRoutes
import express, {Response, Request} from "express"
import {User,Users} from "../models/users"
import jwt from "jsonwebtoken"

const store = new Users()

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

const index = (req: Request, res: Response) => {
    //Authentication with JWT
    try {
        //@ts-ignore
        jwt.verify(req.body.token, process.env.TOKEN_SECRET)
    } catch (error){
        res.status(401)
        res.json(`Invalid Token ${error}`)
    }
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
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        pw: req.body.password,
    }
    try {
        const newUser = await store.create(user)
        //@ts-ignore
        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET)
        res.json(token)
    } catch (error) {
        throw new Error(`${error}: Creating a product did not work.`)
    }
}

const usersRoutes = (app: express.Application) => {
    app.get("/users", verifyAuthToken,index)
    app.get("/users/:id", verifyAuthToken,show)
    app.post("/users", verifyAuthToken, create)
}

export default usersRoutes
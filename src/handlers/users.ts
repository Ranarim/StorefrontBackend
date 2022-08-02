import express, {Response, Request} from "express"
import {User,Users} from "../models/users"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { verifyAuthToken } from "../middleware/verifyAuth"


require('dotenv').config()


const store = new Users()

const index = async(req: Request, res: Response): Promise <void> => {
    try {
        const users = await store.index()
        res.status(200).json(users)
    } catch (err){
        res.status(401).json(`Could not get users: ${err}`)
    }
}

const show = async(req: Request, res: Response): Promise <void> => {
    try {
        const user = await store.show(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(401).json(`Could not get users: ${err}`)
    }
}

const create = async(req: Request, res: Response): Promise <void> => {
    
    try {
        const user:User = {
            firstname: <string> req.body.firstname, 
            lastname: <string> req.body.lastname,
            email: <string> req.body.email,
            pw: <string> req.body.pw,
        }

        const hash = bcrypt.hashSync(
        user.pw + <string> process.env.BCRYPT_PASSWORD, 
        parseInt(<string> process.env.SALT_ROUNDS)
        )
        user.pw = hash

        const newUser = await store.create(user)
        const token = jwt.sign({user: newUser}, <string> process.env.TOKEN_SECRET)
        res.status(200).json(token) 

    } catch (error) {
        console.log("Handler did not work", error)
        res.status(401)
        res.json(`Invalid token ${error}`)
    }
}

const usersRoutes = (app: express.Application) => {
    app.get("/users", verifyAuthToken, index)
    app.get("/users/:id",verifyAuthToken, show)
    app.post("/users", verifyAuthToken, create)
}

export default usersRoutes
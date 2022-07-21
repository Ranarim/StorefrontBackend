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

const index = async(req: Request, res: Response): Promise<void> => {
    try {
		const users = await store.index()
		res.status(200).json(users)
	} catch (err) {
		res.status(401).json(`Could not get users - ${err}`)
	}
}

const usersRoutes = (app: express.Application) => {
    app.get("/users", index)
}

export default usersRoutes
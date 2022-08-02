import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
try {
    const authorizationHeader = <string> req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    const verify = jwt.verify(token, <string> process.env.TOKEN_SECRET)
    next()
} catch (error) {
    res.status(401).send('Invalid Token: You are not authorized to make this action')
}
}
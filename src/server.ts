import express from 'express'
import { Request, Response } from 'express'

import usersRoutes from './handlers/users'
import productsRoutes from './handlers/products'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

usersRoutes(app)
productsRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})






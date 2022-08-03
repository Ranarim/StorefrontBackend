import express from 'express'
import { Request, Response } from 'express'

import usersRoutes from './handlers/users'
import productsRoutes from './handlers/products'
import ordersRoutes from './handlers/orders'
import bodyParser from 'body-parser'

const app: express.Application = express()
const port = process.env.EXPRESS_PORT
const address: string = `127.0.0.1:${port}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Storefront API')
})

usersRoutes(app)

productsRoutes(app)

ordersRoutes(app)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, function () {
		console.log(`server running at: ${address}`)
	})
}

export default app
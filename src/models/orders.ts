import pool from '../database'

export type Order = {
    id?: number, 
    userId: number, 
    status: string,
}

export type OrderProduct = {
    id?: number,
    quantity: number,
    orderid?: number,
    productid: number,
}

export class Orders {
    async index() {
        try {
            const conn = await pool.connect()

            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)
            
            conn.release()

            return result.rows
            
        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`)
        }
    }

    async showOrdersByUser(id: string) {
        try {
            const sql = `SELECT * FROM orders WHERE userid=($1)`

            const conn = await pool.connect()

            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows
        } catch (error) {

            console.log("showOrderByUser did not work")

            throw new Error(`Could not find product ${id}. Error: ${error}`)
        }
    }

    async showProductsByOrderId(id: string): Promise<OrderProduct[]> {
        const conn = await pool.connect()

        const sql = 'SELECT * FROM orderproduct WHERE orderid=($1) '

        const result = await conn.query(sql,[id])
        
        conn.release()

        return result.rows
    }

    async create(o: Order): Promise<Order> {
        try {
             const sql = 'INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *'

             const conn = await pool.connect()
  
            const result = await pool.query(sql, [o.userId, o.status])
  
            const order = result.rows[0]
  
            conn.release()
  
            return order

        } catch (error) {
            console.log("Order model not working")
            
            throw new Error(`Could not add new order. Error: ${error}`)
        }
    }

    async addProductToOrder(op: OrderProduct): Promise <OrderProduct> {
        try {
            const sql = 'INSERT INTO orderproduct (quantity, orderid, productid) VALUES ($1, $2, $3) RETURNING *'

            const conn = await pool.connect()
 
           const result = await pool.query(sql, [op.quantity, op.orderid, op.productid])
 
           const orderProduct = result.rows[0]
 
           conn.release()
 
           return orderProduct

       } catch (error) {
           console.log("Orderproduct model not working")
           throw new Error(`Could not add new orderproduct. Error: ${error}`)
       }
    }
}
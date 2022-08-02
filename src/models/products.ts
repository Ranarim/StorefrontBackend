//@ts-ignore
import pool from '../database'

export type Product = {
    id?: number, 
    name: string, 
    price: number,
}
export class Products {
    async index() {
        try {
            //@ts-ignore
            const conn = await pool.connect()
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            conn.release()

            return result.rows

        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = `SELECT * FROM products WHERE id=($1)`
            //@ts-ignore
            const conn = await pool.connect()

            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find product ${id}. Error: ${error}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
             const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            // @ts-ignore
             const conn = await pool.connect()
  
            const result = await pool.query(sql, [p.name, p.price])
  
            const product = result.rows[0]
  
            conn.release()
  
            return product
        } catch (error) {
            console.log("Product model not working")
            throw new Error(`Could not add new product. Error: ${error}`)
        }
    }
}



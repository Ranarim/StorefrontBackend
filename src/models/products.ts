//@ts-ignore
import pool from '../database'

export type Product = {
    id: number, 
    name: string, 
    price: number,
    category: string,
}


export class Products {
    async index() {
        try {
            //@ts-ignore
            const conn = await pool.connect()
            const sql = 'SELECT FROM* products'

            const result = conn.query(sql)
            
            conn.release()

            return result
        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = `SELECT * FROM products WHERE id=($1)`
            //@ts-ignore
            const conn = client.connect()
            
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find book ${id}. Error: ${error}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
             const sql = 'INSERT INTO products (id, name, price, category) VALUES ($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
             const conn = await client.connect()
  
            const result = await conn.query(sql, [p.id, p.name, p.price, p.category])
  
            const product:Product = result.rows[0]
  
            conn.release()
  
            return product
        } catch (error) {
            throw new Error(`Could not add new product. Error: ${error}`)
        }
    }
}



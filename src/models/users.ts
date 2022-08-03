
import pool from "../database"

export type User = {
    id?: number, 
    firstname?: string, 
    lastname?: string, 
    email: string,
    pw: string,
}

export class Users {
    async index(): Promise <User[] | undefined>  {
        try {
            const conn = await pool.connect()
            
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)
            
            conn.release()

            return result.rows
            } catch (err) {
			console.log(`Error: ${err}`)
		}
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            
            const conn = await pool.connect()
            
            const result = await conn.query(sql, [id])

            conn.release()
            
            return result.rows[0]

        } catch (error) {
            throw new Error(`Could not get user. Error: ${error}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, email, pw) VALUES ($1, $2, $3, $4) RETURNING *'

            const conn = await pool.connect()

            const values = [u.firstname, u.lastname, u.email, u.pw]

            const result = await conn.query(sql, values)

            const user = result.rows[0]
  
            conn.release()
  
            return user
        } catch (error) {
            console.log("controller did not work")
            throw new Error(`Could not add new user. Error: ${error}`)
        }
    }
    
    async authenticate (userEmail: string) {
        try {
            const sql = 'SELECT * FROM users WHERE email=($1)'

            const conn = await pool.connect()

            const result = await conn.query(sql, [userEmail])

            conn.release()

            if (result.rows.length) {
                const user = result.rows[0]
                return user
            }
            return null
        } catch(error) {
            console.log("huhu")
        }
    }
}


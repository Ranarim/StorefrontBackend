import pool from "../database"

export type User = {
    id: number, 
    firstname: string, 
    lastname: string, 
    pw: string,
}

export class Users {
    async index() {
        try {
            const conn = await pool.connect()
            const sql = 'SELECT * FROM users'

            const result = conn.query(sql)
            
            conn.release()

            return result
            } catch (err) {
			console.log(`Error: ${err}`)
		}
    }
}



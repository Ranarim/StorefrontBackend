
//@ts-ignore 
import client from "../database"
import bcrypt from 'bcrypt'

export type User = {
    id: number, 
    firstName: string, 
    lastName: string, 
    pw: string,
}

export class Users {
    async index(): Promise <User[]> {
        try {
            //@ts-ignore
            const conn = client.connect()
            const sql = 'SHOW * FROM users'

            const result = conn.query(sql)

            conn.release()

            return result.rows

        } catch (error) {
            throw new Error(`Could not get users. Error: ${error}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SHOW * FROM users WHERE id=($1)'
            //@ts-ignore
            const conn = client.connect()
            
            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]

        } catch (error) {
            throw new Error(`Could not get user. Error: ${error}`)

        }
    }

    async create(u: User): Promise<User> {
        try {
             const sql = 'INSERT INTO USERS (id, firstName, lastName, password_digest) VALUES ($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
             const conn = await client.connect()

             const hash = bcrypt.hashSync(
                u.pw + pepper, 
                parseInt(saltRounds)
             );
  
            const result = await conn.query(sql, [u.id, u.firstName, u.lastName, hash])
  
            const user:User = result.rows[0]
  
            conn.release()
  
            return user
        } catch (error) {
            throw new Error(`Could not add new user. Error: ${error}`)
        }
    }

    async authenticate(username: string, password: string): Promise <User | null> {
        //@ts-ignore
        const conn = client.connect()

        const sql = 'SELECT password_digest FROM users WHERE username=($1)'

        const result = conn.query(sql, [username])

        if (result.row.length) {

            const user = result.row[0]

            console.log(user)

            if (bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
              }
        }

        return null
    }
}


//@ts-ignore 
import client from "../database"
import bcrypt from 'bcrypt'

export type User = {
    id: number, 
    firstname: string, 
    lastname: string, 
    pw: string,
}

export class Users {
    async index(): Promise <User[]> {
        try {
            //@ts-ignore
            const conn = await client.connect()
            .then(() => console.log("Connection successful"))
            // @ts-ignore
            .catch((error) => console.log("Connection failed: ", error))

            const sql = 'SHOW * FROM users'
            
            console.log(conn)

            const result = await conn.query(sql)

            conn.release()

            return result.rows

        } catch (error) {
            console.log("Could not get users.")
            throw new Error(`Could not get users. Error: ${error}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SHOW * FROM users WHERE id=($1)'
            //@ts-ignore
            const conn = await client.connect()
            .then(() => console.log("Connection successful"))
            // @ts-ignore
            .catch((error) => console.log("Connection failed: ", error))
            
            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]

        } catch (error) {
            console.log("Could not get user.")
            throw new Error(`Could not get user. Error: ${error}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (id, firstname, lastname, pw) VALUES ($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            .then(() => console.log("Connection successful"))
            // @ts-ignore
            .catch((error) => console.log("Connection failed: ", error))

            console.log(u,conn)
            
          /* const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(u.pw, salt); */

            const values = [u.id, u.firstname, u.lastname, u.pw]

            const result = await conn.query(sql, values)

            console.log(result)
            const user:User = result.rows[0]
  
            conn.release()
  
            return user
        } catch (error) {
            throw new Error(`Could not add new user. Error: ${error}`)
        }
    }


    /* async authenticate(username: string, password: string): Promise <User | null> {
        //@ts-ignore
        const conn = client.connect()

        const sql = 'SELECT password_digest FROM users WHERE username=($1)'

        const result = conn.query(sql, [username])

        if (result.row.length) {

            const user = result.row[0]

            console.log(user)

            if (await bcrypt.compare(password, user.password_digest)) {
                return user
              }
        }

        return null
    } */
}

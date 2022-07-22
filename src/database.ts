import {Pool} from "pg"


const pool = new Pool ({
  user: "johannesmaier",
  host: "localhost",
  database: "storefront",
  password: "geheim",
  port: 5432,
})

export default pool
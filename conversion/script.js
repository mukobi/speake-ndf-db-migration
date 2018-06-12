// Postgres constants-change as needed for local db:
const USERNAME = "postgres"
const PASSWORD = "postgres"
const HOST = 'localhost'
const DATABASE = "speake_postgres_db"

// pg module is required
const { Pool, Client } = require('pg')

const client = new Client({
    user: USERNAME,
    host: HOST,
    database: DATABASE,
    password: PASSWORD
})

async function main() {
    await client.connect()

    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

(async ()=>{
    try{
      var result = await main();
      console.log(result);
    }catch(e){
      console.log(e)
    }
})()
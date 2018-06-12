// Postgres constants-change as needed for local db:
const USERNAME = "postgres"
const PASSWORD = "postgres"
const HOST = 'localhost'
const OLDDATABASE = "speake_postgres_db"
const NEWDATABASE = "normalized"

// pg module is required
const { Pool, Client } = require('pg')

const logResponse = function(res) {
    let output
    if(res.rows[0] !== undefined) {
        output = res.rows[0].message
    }
    else {
        output = "No rows returned" 
    }
    console.log(output)
} 

async function main() {
    const oldClient = new Client({
        user: USERNAME,
        host: HOST,
        database: OLDDATABASE,
        password: PASSWORD
    })
    await oldClient.connect()
    
    // get rid of new db if exists
    await oldClient.query('DROP DATABASE ' + NEWDATABASE) 

    // copy over to new database
    logResponse(await oldClient.query(
        'CREATE DATABASE normalized WITH TEMPLATE ' + OLDDATABASE + ' OWNER ' + USERNAME
    ))

    await oldClient.end()
}

(async ()=>{
    try{
      await main();
    }catch(e){
      console.log(e)
    }
})()
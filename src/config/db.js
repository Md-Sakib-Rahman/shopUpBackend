require("dotenv").config()
const {MongoClient} = require("mongodb")

let db, client;
async function connectDB(){
    client = new MongoClient(process.env.MONGO_URI)
    await client.connect();
    db = client.db("shopUp")
    console.log("MongoDb Connected")
    return db; 
}

function getDB(){
    if(!db){
        throw new Error("Database Not Initialized")
    }
    return db;
}


module.exports = {
    connectDB,
    getDB
}
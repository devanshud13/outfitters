const mongoose = require('mongoose');
require('dotenv').config()
const uri =process.env.MONGO_URI
async function connect() {
    try{
        await mongoose.connect(uri)
        console.log("connected to Database")
    }catch(err){
        console.log("Error connecting to Database")
        console.log(err)
    }
}


module.exports = connect;
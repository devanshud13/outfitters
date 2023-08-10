const mongoose = require('mongoose');

const uri =""
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
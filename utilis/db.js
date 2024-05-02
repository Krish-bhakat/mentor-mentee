require('dotenv').config();
const mongoose = require('mongoose');

const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected Succesfully")
    } catch (error) {
        console.log("Database Connection Failed")
    }
}

module.exports = connectdb;
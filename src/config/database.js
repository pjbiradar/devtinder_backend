const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully")
        console.log(mongoose.connection.name);
    }
    catch(err){
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB
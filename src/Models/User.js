const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    LastName:{
        type: String,

    },
    Age:{
        type:Number,
    },
    pwd:{
        type:String
    }
})

module.exports = mongoose.model("User",userSchema)
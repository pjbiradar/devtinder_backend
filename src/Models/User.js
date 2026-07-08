const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 6
    },
    LastName:{
        type: String
    },
    Age:{
        type:Number,
        min: 18,
        required: true,
    },
    pwd:{
        type:String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,

    },
    gender:{
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Not a valid gender (Male , Female and other)")

            }
        }
    },
    about:{
        type: String,
        default: "this is default message about user"
        
    },
    skills:{
        type:[String],
    },
    photoUrl:{
        type:String,
        default: "https://picsum.photos/id/237/200/300",

    },
   
    
    
},
 {
   timestamps: true
        
}

)

module.exports = mongoose.model("User",userSchema)

const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    age:{
        type: Number,
        min: 18,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please enter validate email")
            }
        }
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("please enter validate url")
            }
        }
    },
},
 {
   timestamps: true
}
)

// issues a login token for this specific user
userSchema.methods.getJWT = function(){
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

// compares a login attempt's plain password against the stored hash
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema)
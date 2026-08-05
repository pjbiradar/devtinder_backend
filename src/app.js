require('dotenv').config();
const express = require("express")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const connectDB = require('./config/database')
const app = express();
const User =  require("./Models/User");
const {userAuth} = require("../middleware/auth")

app.use(express.json())
app.use(cookieParser())

//signup api
app.post("/signup",async (req,res)=>{
    try{
        const {firstName, lastName,age,password,email,gender} = req.body;

        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            age,
            gender

        })

        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        console.log("Generated Token:", token);
        
        res.cookie("token",token,{expires:new Date(Date.now()+7*24*60*60*1000)})
        console.log("cookie sent")
        res.send("User Added successfully")

   }
   catch(err){
    res.status(400).send("Error saving the user"+ err.message)
   }
    
})

app.post("/login",async(req,res)=>{
    try{
        const{email,password} = req.body;
        const  user = await User.findOne({email: email})
        if(!user){
            throw new Error("Invalid credentials")
        }

        const ispasswordValid = await user.validatePassword(password)
        if(!ispasswordValid){
            throw new Error("Invaild credentials")
        }

        const token = await user.getJWT();
        res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

        res.send("Login successful!");
        }
        catch(err){
        res.status(400).send("Error: " + err.message);
        }
    }
)

app.get("/profile", userAuth, (req, res) => {
    res.send(req.user);
});

//get the user by age email
app.get("/user",async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        console.log(user)
        if(!user){
            res.status(404).send("user not found")

        }
        
        res.send(user)
        
    }
    catch(err){
        res.status(404).send("something went wrong")

    }
})


//update data of the user
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills","email"]
        const isUpdatedAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k))

        if(!isUpdatedAllowed){
            throw new Error("update is not allowed")
        }

        if(data?.skills && data.skills.length > 10){
            throw new Error("skills should be less than 10 or equal to 10")
        }

        const user = await User.findByIdAndUpdate(userId, data, {returnDocument: 'after', runValidators: true})
        res.send("user successfully updated")
    }
    catch(err){
        res.status(400).send("Error saving the user: " + err.message)
    }
})

//feed api - get/feed -get all the users from the database

app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find({})
        res.send(user)

    }
    catch(err){
        res.status(404).send(err.message)
    }
})


//api to delete the userid 
app.delete("/user",async(req,res)=>{

    try{
        const user = await User.findByIdAndDelete({_id: req.body.userId})
        res.send("deleted user successfuly")

    }
    catch(err){
        res.status(404).send(err.message)
    }
})






//call db before listnting to the port 3000
connectDB();

app.listen(3000,()=>{
    console.log("server running on port 3000")
})

//errorhandling
// app.get('/user',(err,req,res,next)=>{
//     try{
//         //logic of db call and getuserdata
       
//         throw new Error("DB failed");
//         res.send("userdatasent");
//     }
//     catch(err){
//         //log your error
//        res.status(500).send("something went wrong")
      
//     }
// })

// app.use((err, req, res, next) => {
//     console.error(err.message); // log error
  
//     res.status(500).json({
//       message: "Something went wrong"
//     });
//   });



/////////////////////////////////////
//middleware 
// const {adminAuth,userAuth} = require('../middleware/auth')
//for userauth
// app.use("/user",userAuth)
// app.get("/user/adduser",userAuth,(req,res,next)=>{
//     res.send("useris added")
// })
// app.use("/admin",adminAuth)
// app.get("/admin/alldata",(req,res,next)=>{
//     res.send("all data reviewed")
// })
// app.post("/admin/deletedata",(req,res,next)=>{
//     res.send("all data deleted")
// })
///////////////////////////////////////////////////



////////////////////////////////////////////////////////
//this is dynamic routes 
// app.get('/user/:id/:firstname/:lastname',(req,res)=>{
//     // console.log(req.query)
//     console.log(req.params)
//     res.send({firstname: "pooja", lastname: "biradar"})
// })

// app.post('/user',(req,res)=>{
//     res.send("This is the post http request for user")
// })

// app.patch('/user',(req,res)=>{
//     res.send("This is the patch http request for user")
// })

// app.delete('/user',(req,res)=>{
//     res.send("This is the delete http request for user")
// })

///////////////////////////////////////////////


// app.listen(3000,()=>{
//     console.log("server running on port 3000")
// })
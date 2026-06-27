require('dotenv').config();
console.log("URI:", process.env.MONGODB_URI);  // check what this prints
const express = require("express")

const connectDB = require('./config/database')
const app = express();
app.use(express.json())


const User =  require("./Models/User");


//usnig express middleware 
app.use(express.json())

//adding email key to the olders users also
app.put("/addemailtooldusers",async(req,res)=>{
    try{
        const result = await User.updateMany(
            {email: {$exists: false}},
            {$set: {email: ""} }
            )

        res.send({
            message: "email is added to old users",
            modifiedCount: result.modifiedCount
        })

    }
    catch(err){
        res.status(400).send(err.message)

    }
})

//get the user by age email
app.get("/user",async(req,res)=>{
    try{
        const user = await User.find({email: req.body.email})
        console.log(user)
        if(user.length === 0){
            res.status(404).send("user not found")

        }
        else{
            res.send(user)
        }
    }
    catch(err){
        res.status(404).send("something went wrong")

    }


})


//feed api - get/feed -get all the users from the database

app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find({

        })
        res.send(user)

    }
    catch(err){
        res.status(404).send(err.message)

    }

})


//creating an signup api
app.post("/signup",async (req,res)=>{
    //creating new instance of the usermodel
    const user = new User(req.body)

   try{
    await user.save();  
    res.send("User Added successfully")

   }
   catch(err){
    res.status(400).send("Error saving the user"+ err.message)
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
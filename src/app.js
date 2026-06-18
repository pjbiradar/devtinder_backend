require('dotenv').config();
console.log("URI:", process.env.MONGODB_URI);  // check what this prints
const express = require("express")


const connectDB = require('./config/database')
const app = express();
app.use(express.json())

//creating an signup api
const User =  require("./Models/User")

app.post("/signup",async (req,res)=>{
    //creating new instance of the usermodel
    const user = new User({
        firstName:"Pooja",
        LastName: "Biradar",
        Age: 56,
        pwd: "pooja@123"
    })

    await user.save();
    res.send("User Added successfully")
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
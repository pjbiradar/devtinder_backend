const express = require("express")

const app = express();

const {adminAuth,userAuth} = require('../middleware/auth')

//for userauth
// app.use("/user",userAuth)
app.get("/user/adduser",userAuth,(req,res,next)=>{
    res.send("useris added")
})


app.use("/admin",adminAuth)

app.get("/admin/alldata",(req,res,next)=>{
    res.send("all data reviewed")
})

app.post("/admin/deletedata",(req,res,next)=>{
    res.send("all data deleted")
})





//this is dynamic routes 
// app.get('/user/:id/:firstname/:lastname',(req,res)=>{
//     // console.log(req.query)
//     console.log(req.params)
//     res.send({firstname: "pooja", lastname: "biradar"})
// })

app.post('/user',(req,res)=>{
    res.send("This is the post http request for user")
})

app.patch('/user',(req,res)=>{
    res.send("This is the patch http request for user")
})

app.delete('/user',(req,res)=>{
    res.send("This is the delete http request for user")
})



app.listen(3000,()=>{
    console.log("server running on port 3000")
})
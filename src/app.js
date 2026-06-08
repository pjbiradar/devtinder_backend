const express = require("express")

const app = express();


//router handlers
app.use("/user",(req,res,next)=>{
    console.log("this is response1")
    // res.send("this is response1")
    next()
},
(req,res,next)=>{
    res.send("this is response2")
    next();
},

(req,res,next)=>
{
    res.send("this is response 3")
    next();

}
)


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
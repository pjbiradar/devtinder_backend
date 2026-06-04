const express = require("express")

const app = express();

app.use('/',(req,res)=>{
    res.send("homepage")
})

app.use('/test',(req,res)=>{
    res.send("hey this is the test ")
})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})
const express = require("express")

const app = express();

app.get('/',(req,res)=>{
    res.send("homepage")
})

app.get('/see',(req,res)=>{
    res.send("hey this is the test ")
})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})
const adminAuth =(req,res,next)=>{
    console.log("hi htis is adminauth")
    const token = "xyz"
    const isAuthorized = token === "xyz"
    if(!isAuthorized){
        res.send("unauthorized")
    }else{
        next();
    }

}


const userAuth = (req,res,next)=>{
    console.log("userauth middleware")
    const token = "123w"
    const isAuthorized = token === "123"
    if(!isAuthorized){
        res.send("its unauthorized user")
    }
    else{
        next();
    }
}

module.exports = {adminAuth,userAuth}
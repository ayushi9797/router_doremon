const jwt = require("jsonwebtoken")
require('dotenv').config()
const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"todo")
        if(decoded){
            const userID = decoded.userID
            console.log(decoded)
            req.body.userID=userID
            next()
        }else{
            res.send({message:"please login first"})
        }
    }else{
        res.send({message:"please login first"})

    }
}

module.exports={
    authenticate
}
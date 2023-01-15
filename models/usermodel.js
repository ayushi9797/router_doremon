const mongoose = require("mongoose")

const userSchema =  mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
const UserModel = mongoose.model("user",userSchema)


module.exports={
    UserModel
}

// {
//     "name":"ayushi",
//     "email":"ayushi123@gmail.com",
//     "password":"123"
// }
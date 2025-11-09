const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {type:String, required:true, unique:true, index:true},
    fullname : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password :{type:String, required:true}
})

let userModel = mongoose.model("messagengerUsers",userSchema)
module.exports= {userModel}
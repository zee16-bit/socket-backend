require("dotenv").config()
const bcrypt = require("bcryptjs")
const {userModel} = require("../model/user.model")
//register
const registerUser = async(req,res)=>{
    try{
    const {usernam} = req.body
    const {fullnam} = req.body
    const {emai} = req.body
    let passworde = req.body.password
    // console.log(req.body)
    const hash = await bcrypt.hash(passworde, 10)
    if(!hash){
        console.log("err saving password")
    }else{
        delete req.body.password
        req.body.password = hash
        let user = new userModel(req.body)
        user.save()
        res.status(200).send({status:true,message:"user saved"})
    }
    }catch(err){
        console.log(err)
    }
}

const signin = async(req,res)=>{
    const {email}= req.body
    const {password}= req.body
    try{
        const user = await userModel.findOne({email : email})
        if(!user){
            res.send({status:false,message:"Wrong credentials"})
        }else{
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            res.status(200).send({status:true, message:"Logging in"})
        }else{
            res.send({status:false,message:"Wrong credentials"})
        }
        }
    }catch(err){
        console.log(err)
    }
}
module.exports ={registerUser, signin}
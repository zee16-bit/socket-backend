const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT
const URI = process.env.URI
const userRouter = require("./routes/user.routes")
const cors = require("cors")


app.use(cors())
app.use(express.urlencoded({extended:true})) //what do they do
app.use(express.json) //same
app.use("/user",userRouter)

const connection = app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`app has started at PORT: ${PORT}`)
    }
})

const socketio = require("socket.io")
const { default: mongoose } = require("mongoose")

mongoose.connect(URI)
.then(()=>{
    console.log("mongoose connected")
})
.catch((err)=>{
    console.log("Mongoose err connecting")
    console.log(err)
})

const io = socketio(connection,{cors:{options:"*"}})
io.on("connection",(stream)=>{
    console.log("User connected")
    stream.on("newmessage",(message)=>{
        io.emit("message",message)
    })
    stream.on("username",(message)=>{
        console.log(message)
    })
    stream.on("typing",(message)=>{
        console.log(message)
    })
})
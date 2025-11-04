const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT
const URI = process.env.URI
const route = require("./routes/user.routes")

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
    console.log(stream)
    console.log("User connected")
    stream.on("newmessage",(message)=>{
        console.log(message, stream.id)
        io.emit("message",message)
    })
})
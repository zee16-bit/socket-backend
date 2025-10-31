const express = require("express")
const app = express()
const PORT = 5000



const connection = app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`app has started at PORT: ${PORT}`)
    }
})
const socketio = require("socket.io")

const io = socketio(connection,{cors:{options:"*"}})
io.on("connection",(stream)=>{
    console.log("User connected")
    stream.on("newmessage",(message)=>{
        console.log(message)
    })
})
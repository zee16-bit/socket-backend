const express = require("express")
const route = express.Router()
const {registerUser}= require("../controller/user.controller")
route.post("/register",registerUser)
module.exports = route
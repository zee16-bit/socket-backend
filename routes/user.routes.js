const express = require("express")
const route = express.Router()
const {registerUser, signin}= require("../controller/user.controller")
route.post("/register",registerUser)
route.post("/signin",signin)
module.exports = route
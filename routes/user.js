const express = require("express")
const {check} = require('express-validator')
const { signup, login, logout, profile } = require("../controllers/user")
const {auth} = require("../middlewares/auth");
const router = express.Router()

router.post("/signup",[
    check("name", "Name should be atleast 3 characters long").isLength({min: 3}),
    check("email", "Email id should be valid").isEmail(),
    check("password", "Password should be at least 8 characters long").isLength({min: 8}),
  ], signup)

router.post("/login", login)

router.get("/profile", auth, profile)

router.get("/logout", auth, logout)

module.exports = router
const User = require("../models/user")
const {validationResult} = require('express-validator')

exports.signup = (req, res) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg
      })
    }
    
    const newuser = new User(req.body)
    
    if(newuser.password != newuser.password2) return res.status(400).json({message: "Password didn't match."})
    
    User.findOne({email : newuser.email}, (err, user) => {
        if(user) return res.status(400).json({ auth : false, message : "This email id is already registered."})
 
        newuser.save((err, doc) => {
            if(err) {console.log(err)
                return res.status(400).json({ 
                    success : false
                })}
            res.status(200).json({
                success : true,
                user : doc
            })
        })
    })
}

exports.login = (req, res) => {
    let token = req.cookies.auth
    User.findByToken(token, (err, user) => {
        if(err) return  res(err)
        if(user) return res.status(400).json({
            error : true,
            message : "You are already logged in!"
        })
    
        else{
            User.findOne({"email" : req.body.email}, (err,user) => {
                if(!user) return res.json({isAuth : false, message :  "Email id is not registerd"})
        
                user.comparepassword(req.body.password, (err,isMatch) => {
                    if(!isMatch) return res.status(401).json({ isAuth : false, message : "Incorrect password!"})
        
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err)
                    res.cookie("auth", user.token).json({
                        name : user.name
                    })
                })    
            })
          })
        }
    })
}

exports.profile = (req, res) => {
    return res.status(200).json({
        name : req.user.name,
        email : req.user.email,
        phoneNumber : req.user.phoneNumber,
        address : req.user.address        
    })
}

exports.logout = (req, res) => {
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err)
        res.sendStatus(200)
    })
}

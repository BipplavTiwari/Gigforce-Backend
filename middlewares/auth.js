const User = require('./../models/user')

let auth = function(req, res, next) {
    let token = req.cookies.auth
    User.findByToken(token, function(err, user) {
        if(err) throw err
        if(!user) return res.status(401).json({
            error :true,
            message : "Please ensure that you are logged in!"
        })
        req.token = token
        req.user = user
        next()
    })
}

module.exports={auth}
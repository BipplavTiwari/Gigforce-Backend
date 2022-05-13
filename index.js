const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser")
const db = require("./config/config").get(process.env.NODE_ENV)
const userRoutes = require("./routes/user")
const cors = require("cors")
const app = express()

// app use
app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json())
app.use(cookieParser())
app.use(cors())

// database connection
mongoose.Promise = global.Promise
mongoose.connect(db.DATABASE, { useNewUrlParser: true, useUnifiedTopology : true }, (err) => {
    if(err) console.log(err)
    console.log("Database is connected!")
})


app.get("/", (req,res) => {
    res.status(200).send(`Welcome to my gigforce assignment!`)
})

app.use("/api", userRoutes)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}!`)
})
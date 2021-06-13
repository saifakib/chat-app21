// external imports
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")

// internal imports
const { loginRoute, inboxRoute, usersRoute } = require('./router')
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler')


const app = express()

// request parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set view engine
app.set("view engine", "ejs")

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup
app.use("/", loginRoute)
app.use("/users", usersRoute)
app.use("/inbox", inboxRoute)

// error handling
app.use(notFoundHandler)
app.use(errorHandler)

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        // server listen
        app.listen(process.env.PORT, () => {
            console.log(`app listening to port ${process.env.PORT}`);
        })
    })
    .catch((e) => console.log(e))
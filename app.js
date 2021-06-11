// external imports
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")


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

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTIION_STRING, {
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

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const { User } = require('../models')


const getLogin = (req, res, next) => {
    res.render("index")
}

const login = async (req, res, next) => {

    try {
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }]
        })

        if (user && user._id) {
            const isPasswordValid = bcrypt.compare(req.body.password, user.password)

            if (isPasswordValid) {
                // generate user object
                const userObject = {
                    userid: user._id,
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    avatar: user.avatar || null,
                    role: user.role || "user",
                }

                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                })

                // cookie set 
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                res.locals.loggedInUser = userObject

                res.redirect("inbox")
            } else {
                throw createError("Login Failed ! Please Try Again !")
            }
        } else {
            throw createError("Login Failed ! Please Try Again !")
        }
    }
    catch (err) {
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}


module.exports = {
    getLogin,
    login,
    logout
}
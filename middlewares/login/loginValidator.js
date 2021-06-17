const { check, validationResult } = require('express-validator')


const loginValidator = [
    check('username')
        .isLength({
            min: 1
        })
        .withMessage("Mobile Number or Email Required"),
    check('password')
        .isLength({ min: 5 })
        .withMessage("Password must be required")
]

const loginValidatorHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if(Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        res.render("index", {
            data: {
                username: req.body.user
            },
            errors: mappedErrors
        })
    }
}

module.exports = {
    loginValidator,
    loginValidatorHandler
}
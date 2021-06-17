const router = require("express").Router()

const { getLogin, login } = require("../controller")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const { redirectLoggedIn } = require("../middlewares/common/checkLogin")
const { loginValidator, loginValidatorHandler } = require('../middlewares/login/loginValidator')

const page_title = "Login"

router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin)


router.post("/", decorateHtmlResponse(page_title), loginValidator, loginValidatorHandler, login)

module.exports = router
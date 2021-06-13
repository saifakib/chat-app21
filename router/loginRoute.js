const router = require("express").Router()

const { getLogin } = require("../controller")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")

router.get("/", decorateHtmlResponse("Login"), getLogin)

module.exports = router
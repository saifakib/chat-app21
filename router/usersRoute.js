const router = require("express").Router()

const { getUsers } = require("../controller")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")

router.get("/", decorateHtmlResponse("Users"), getUsers)

module.exports = router
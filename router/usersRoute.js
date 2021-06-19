const router = require("express").Router()

const {
    getUsers,
    addUser,
    removeUser
} = require("../controller")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const avatarUpload = require('../middlewares/users/avatarUpload')
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidator')
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin")


router.get("/", decorateHtmlResponse("Users"), checkLogin, requireRole(["admin"]), getUsers)

router.post("/",
    checkLogin,
    requireRole(["admin"]),
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser
)

router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser)

module.exports = router
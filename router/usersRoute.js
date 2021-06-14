const router = require("express").Router()

const {
    getUsers,
    addUser,
    removeUser
} = require("../controller")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const avatarUpload = require('../middlewares/users/avatarUpload')
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidator')


router.get("/", decorateHtmlResponse("Users"), getUsers)

router.post("/",
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser
)

router.delete("/:id", removeUser)

module.exports = router
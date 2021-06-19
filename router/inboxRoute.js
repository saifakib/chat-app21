const router = require("express").Router()

const { getInbox, searchUser, addConversation, getMessage, sendMessage, removeConversation } = require("../controller")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const { checkLogin } = require("../middlewares/common/checkLogin")
const attachmentUpload = require('../middlewares/inbox/attachmentUpload')

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox)

// serach user for conversation
router.post("/search", checkLogin, searchUser)

// add conversation
router.post("/conversation", checkLogin, addConversation);

// get message of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessage);

// send message 
router.post("/message", checkLogin, attachmentUpload, sendMessage)

// remove a conversation
router.delete("/conversation/:conversationId", checkLogin, removeConversation)


module.exports = router
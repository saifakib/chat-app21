
const { getLogin, login, logout } = require('./loginController')
const { getUsers, addUser, removeUser} = require('./usersController')
const { getInbox, searchUser, addConversation, getMessage, sendMessage, removeConversation } = require('./inboxController')

module.exports = {
    getLogin,
    login,
    logout,
    getInbox,
    searchUser,
    addConversation,
    getMessage,
    sendMessage,
    removeConversation,
    getUsers,
    addUser,
    removeUser
}
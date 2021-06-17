
const { getLogin, login } = require('./loginController')
const { getUsers, addUser, removeUser} = require('./usersController')
const { getInbox} = require('./inboxController')

module.exports = {
    getLogin,
    login,
    getInbox,
    getUsers,
    addUser,
    removeUser
}

const { getLogin } = require('./loginController')
const { getUsers, addUser, removeUser} = require('./usersController')
const { getInbox} = require('./inboxController')

module.exports = {
    getLogin,
    getInbox,
    getUsers,
    addUser,
    removeUser
}
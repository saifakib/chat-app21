
const { getLogin } = require('./loginController')
const { getUsers} = require('./usersController')
const { getInbox} = require('./inboxController')

module.exports = {
    getLogin,
    getInbox,
    getUsers
}
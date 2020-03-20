const bcrypt = require('bcrypt')
const userService = require('../users/users.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(userName, password) {
    logger.debug(`auth.service - login with username: ${userName}`)
    if (!userName || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUserName(userName)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password;
    return user;
}

async function signup(email, password, username, mony, firstName, lastName,listId) {
    console.log('a4')
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')
    console.log('a5',email, password, username,mony, firstName, lastName)
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.addUser({ email, password: hash, username,mony, firstName, lastName,listId})
}

module.exports = {
    signup,
    login,
}
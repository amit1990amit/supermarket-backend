const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}
 
async function signup(req, res) {
    console.log('a3',req.body)
    try {
        const { email, password, username, mony, firstName , lastName,listId } = req.body
        logger.debug(email + ", " + username + ', ' + password + '+ ' + mony + ", " + firstName + ', ' + lastName )
        const account = await authService.signup(email, password, username, mony, firstName, lastName,listId )
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(username, password)
        req.session.user = user
        console.log('a6',user)
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}
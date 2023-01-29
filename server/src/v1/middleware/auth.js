const jsonwebtoken = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ msg: 'No token - authorization denied' })
    }
    try {
        const tokenDecoded = jsonwebtoken.verify(token, config.get('TOKEN_SECRET_KEY'))
        req.user = tokenDecoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token not valid' })
    }
}

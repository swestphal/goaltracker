const jsonwebtoken = require('jsonwebtoken')
const config = require('config')
const User = require('./../models/User')

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns authenticated user
 */
exports.verifyToken = async (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ msg: 'No token - authorization denied' })
    }
    try {
        const tokenDecoded = jsonwebtoken.verify(token, config.get('TOKEN_SECRET_KEY'))
        const userId = tokenDecoded.user.id
        const user = await User.findById(userId).select('-password')
        if (!user) return res.status(401).json('Unathorized')
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token not valid' })
    }
}

const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const gravatar = require('gravatar')
const config = require('config')

exports.register = async (req, res) => {
    const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    const user = new User({
        ...req.body,
        avatar
    })

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(req.body.password, salt)

        await User.create(user)

        const token = jsonwebtoken.sign(
            { user: { id: user._id } },
            config.get('TOKEN_SECRET_KEY'),
            { expiresIn: '24h' }
        )
        res.status(201).json({ token })
    } catch (err) {
        res.status(500).json(err)
    }
}

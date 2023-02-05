const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const config = require('config')

exports.verifyToken = async (req, res) => {
    res.status(200).json({ user: req.user })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).select('password username')
        // no user
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: 'email',
                        msg: 'Invalid email or password'
                    }
                ]
            })
        }

        // compare passwords of found user

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                errors: [
                    {
                        param: 'username',
                        msg: 'Invalid username or password'
                    }
                ]
            })
        }

        // passwords are matching

        user.password = undefined

        const token = jsonwebtoken.sign(
            { user: { id: user._id } },
            config.get('TOKEN_SECRET_KEY'),
            { expiresIn: '24h' }
        )

        res.status(200).json({ user, token })
    } catch (err) {
        res.status(500).json(err)
    }
}

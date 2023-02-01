const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')
const { body } = require('express-validator')
const validation = require('./../middleware/validation')
const userController = require('../controllers/user')

// @route   GET api/v1/auth
// @desc    Test route
// @access  Protected
router.get('/', auth.verifyToken, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select('-password')
        res.json(req.user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/v1/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    body('password', 'Paword is required').exists(),
    body('email', 'Please enter a valid email').isEmail()
],
validation.validate,
userController.login,
(req, res) => res.send('Users route'))

module.exports = router

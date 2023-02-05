const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')
const { body } = require('express-validator')
const validation = require('./../middleware/validation')
const userController = require('../controllers/user')
const authController = require('../controllers/auth')

// @route   Post api/v1/auth/verify-token
// @desc    Test route
// @access  Protected
router.post('/verify-token',
    auth.verifyToken,
    authController.verifyToken
)

// @route   POST api/v1/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    body('password', 'Password is required').exists(),
    body('email', 'Please enter a valid email').isEmail()
],
validation.validate,
userController.login)

module.exports = router

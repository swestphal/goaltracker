const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const validation = require('./../handlers/validation')
const userController = require('../controllers/user')
// @route   POST api/v1/users
// @desc    Register user
// @access  Public
router.post('/', [
    body('username', 'Username is required').not().isEmpty(),
    body('username', 'Username must have 6 or more characters').isLength({ min: 6 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
validation.validate,
userController.register,
(req, res) => res.send('Users route'))

module.exports = router

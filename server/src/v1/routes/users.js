const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const validation = require('./../middleware/validation')
const userController = require('../controllers/user')
const User = require('./../models/user')

// @route   POST api/v1/users
// @desc    Register user
// @access  Public
router.post('/', [
    body('username', 'Username is required').not().isEmpty(),
    body('username', 'Username must have 6 or more characters').isLength({ min: 6 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    body('username').custom(value => {
        // in order to avoid UnhandledPromiseRejectionWarning
        // wrap the custom validation code in a promise
        // code before
        // return User.findOne({ name: value }, (err, user) => {
        //     if (user) {
        //         return Promise.reject('already in use');
        //     }
        // })
        return new Promise((resolve, reject) => {
            User.findOne({ username: value }, (_err, user) => {
                if (user) {
                    return reject(new Error('Username is already in use'))
                }
                resolve()
            })
        })
    }),
    body('email').custom(value => {
        return new Promise((resolve, reject) => {
            User.findOne({ email: value }, (_err, user) => {
                if (user) {
                    return reject(new Error('Email is already in use'))
                }
                resolve()
            })
        })
    })

],
validation.validate,
userController.register,
(req, res) => res.send('Users route'))

module.exports = router

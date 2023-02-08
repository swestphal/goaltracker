const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')
const { body } = require('express-validator')
const validation = require('./../middleware/validation')
const profileController = require('../controllers/profile')

// @route   GET api/v1/profile/me
// @desc    Get current users profile
// @access  Protected
router.get('/me',
    auth.verifyToken,
    profileController.me
)

// @route   GET api/v1/profile/all
// @desc    Get all profiles
// @access  Protected
router.get('/all',
    auth.verifyToken,
    profileController.getAll
)

// @route   POST api/v1/profile
// @desc    Create or update user profile
// @access  Private
router.post('/',
    auth.verifyToken, [
        body('status', 'Status is required').not().isEmpty(),
        body('skills', 'Skills is required').not().isEmpty()
    ],
    validation.validate,
    profileController.create
)

module.exports = router

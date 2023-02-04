const express = require('express')
const router = express.Router()
const Profile = require('./../models/Profile')
const auth = require('./../middleware/auth')
const { body } = require('express-validator')
const validation = require('./../middleware/validation')
const profileController = require('../controllers/profile')

// @route   GET api/v1/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth.verifyToken, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'No profile available' })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/v1/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['username', 'avatar'])
        if (!profiles) {
            return res.status(400).json({ msg: 'No profile available' })
        }
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/v1/profile
// @desc    Create or update user profile
// @access  Protected
router.post('/',
    auth.verifyToken, [
        body('status', 'Status is required').not().isEmpty(),
        body('skills', 'Skills is required').not().isEmpty()
    ],
    validation.validate,
    profileController.update,
    (req, res) => {
        res.send('User route')
    })
module.exports = router

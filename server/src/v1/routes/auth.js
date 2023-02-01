const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')

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

module.exports = router

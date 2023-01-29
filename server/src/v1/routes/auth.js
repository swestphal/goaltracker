const express = require('express')
const router = express.Router()

// @route   GET api/v1/auth
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Auth route'))

module.exports = router

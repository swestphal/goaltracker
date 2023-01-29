const express = require('express')
const router = express.Router()

// @route   GET api/v1/board
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Board route'))

module.exports = router

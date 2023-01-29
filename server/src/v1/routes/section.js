const express = require('express')
const router = express.Router()

// @route   GET api/v1/section
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Section route'))

module.exports = router

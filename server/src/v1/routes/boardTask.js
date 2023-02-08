const express = require('express')
const router = express.Router()

// @route   GET api/v1/task
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Task route'))

module.exports = router

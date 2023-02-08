const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')
const boardController = require('../controllers/board')

// @route   GET api/v1/board
// @desc    Get all boards
// @access  Protected
router.get('/',
    auth.verifyToken,
    boardController.getAll
)

// @route   POST api/v1/board
// @desc    Create or update board
// @access  Protected
router.post('/',
    auth.verifyToken,
    boardController.create
)

module.exports = router

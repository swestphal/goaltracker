const express = require('express')
const router = express.Router()
const { param } = require('express-validator')
const validation = require('./../middleware/validation')
const auth = require('./../middleware/auth')
const boardController = require('../controllers/board')

// @route   GET api/v1/board
// @desc    Get all boards
// @access  Protected
router.get('/',
    auth.verifyToken,
    boardController.getAll
)

// @route   Get api/v1/board/:id
// @desc    Get a single board
// @access  Protected
router.get('/:boardId',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid id'))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardController.getOne
)

// @route   Put api/v1/board/:id
// @desc    Update a single board
// @access  Protected
router.put('/:boardId',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid id'))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardController.update
)

// @route   POST api/v1/board
// @desc    Create or update board
// @access  Protected
router.post('/',
    auth.verifyToken,
    boardController.create
)

// @route   PUT api/v1/board
// @desc    Update position of board
// @access  Protected
router.put('/',
    auth.verifyToken,
    boardController.updatePosition
)

module.exports = router

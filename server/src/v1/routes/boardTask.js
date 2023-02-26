const express = require('express')
const router = express.Router()
const { param } = require('express-validator')
const validation = require('./../middleware/validation')
const auth = require('./../middleware/auth')
const boardTaskController = require('../controllers/boardTask')

// @route   POST api/v1/board/task/:boardId/:taskId
// @desc    Create a new task
// @access  Protected
router.post('/:boardId',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid board id'))
            }
            resolve()
        })
    }),
    param('sectionId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid section id'))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardTaskController.create
)

// @route   PUT api/v1/board/task/update-position/:boardId
// @desc    Update position of a task
// @access  Protected
router.put('update-position/:boardId/',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid board id'))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardTaskController.updatePosition
)

// @route   PUT api/v1/board/task/:boardId/:taskId
// @desc    Create a new task
// @access  Protected
router.put('/:boardId',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid board id'))
            }
            resolve()
        })
    }),
    param('taskId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid section id'))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardTaskController.create
)

// @route   DELETE api/v1/board/section/:boardId/:taskId
// @desc    Delete a task
// @access  Protected
router.delete('/:boardId/:taskId',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid board id'))
            }
            resolve()
        })
    }),
    param('taskId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error('invalid section id'))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardTaskController.delete
)

module.exports = router

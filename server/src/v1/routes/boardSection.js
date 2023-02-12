const express = require('express')
const router = express.Router()
const { param } = require('express-validator')
const validation = require('./../middleware/validation')
const auth = require('./../middleware/auth')
const boardSectionController = require('../controllers/boardSection')

// @route   POST api/v1/board/section/:boardId
// @desc    Create a new section
// @access  Protected
router.post('/:boardId',
    param('boardId').custom(value => {
        return new Promise((resolve, reject) => {
            if (!validation.isObjectId(value)) {
                return reject(new Error(`invalid id ${value}}-`))
            }
            resolve()
        })
    }),
    validation.validate,
    auth.verifyToken,
    boardSectionController.create
)

// @route   PUT api/v1/board/section/:boardId/:sectionId
// @desc    Update a section
// @access  Protected
router.put('/:boardId/:sectionId',
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
    boardSectionController.update
)

// @route   DELETE api/v1/board/section/:boardId/:sectionId
// @desc    Delete a section
// @access  Protected
router.delete('/:boardId/:sectionId',
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
    boardSectionController.delete
)

module.exports = router

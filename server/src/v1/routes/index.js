const router = require('express').Router()

router.use('/users', require('./users'))

router.use('/auth', require('./auth'))

router.use('/profile', require('./profile'))

router.use('/posts', require('./posts'))

router.use('/boards', require('./board'))
router.use('/boards/:boardId/sections', require('./section'))
router.use('/boards/:boardId/tasks', require('./task'))

module.exports = router

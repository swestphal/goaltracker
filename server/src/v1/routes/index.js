const router = require('express').Router()

router.use('/users', require('./users'))

router.use('/auth', require('./auth'))

router.use('/profile', require('./profile'))

router.use('/posts', require('./posts'))

router.use('/boards', require('./board'))
router.use('/board/sections', require('./boardSection'))
router.use('/board/tasks', require('./boardTask'))

module.exports = router

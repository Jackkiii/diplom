const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const publicationRouter = require('./publicationRouter')
const categoryRouter = require('./categoryRouter')
const groupRouter = require('./groupRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/publication', publicationRouter)
router.use('/group', groupRouter)

module.exports = router
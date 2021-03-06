const Router = require('express')
const router = new Router()
const publicationController = require('../controllers/publicationController')

router.post('/', publicationController.create)
router.get('/', publicationController.getAll)
router.get('/:id', publicationController.getOne)

module.exports = router
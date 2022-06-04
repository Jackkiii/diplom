const Router = require('express')
const router = new Router()
const publicationController = require('../controllers/publicationController')

router.post('/', publicationController.create)
router.get('/', publicationController.getAll)
router.get('/download/:link_file', publicationController.downloadFile)
router.get('/:id', publicationController.getOne)
router.get('/user/:userId', publicationController.getListUserId)


module.exports = router
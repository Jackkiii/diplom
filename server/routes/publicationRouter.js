const Router = require('express')
const router = new Router()
const publicationController = require('../controllers/publicationController')

router.post('/', publicationController.create)
router.get('/', publicationController.getAll)
//router.get('/search/date/:date', publicationController.getListData)
router.get('/download/:link_file', publicationController.downloadFile)
router.get('/check-name/:name', publicationController.getOneByName)
router.get('/:id', publicationController.getOne)
router.get('/user/:userId', publicationController.getListUserId)


module.exports = router
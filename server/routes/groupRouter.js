const Router = require('express')
const router = new Router()
const groupController = require('../controllers/groupController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), groupController.create)
router.post('/delete', checkRole('ADMIN'), groupController.delete)
router.get('/', groupController.getAll)
router.get('/:id', groupController.getOne)

module.exports = router
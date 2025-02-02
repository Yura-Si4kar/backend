const Router = require('express');
const router = new Router();
const ItemController = require('../controllers/itemController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), ItemController.create);
router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getOne);
router.delete('/:id', ItemController.delete);

module.exports = router;
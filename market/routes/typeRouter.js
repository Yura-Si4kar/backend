const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', TypeController.getAll);
router.post('/', checkRole('ADMIN'), TypeController.create);
router.delete('/:id', checkRole('ADMIN'), TypeController.delete);

module.exports = router;
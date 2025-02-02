const Router = require('express');
const router = new Router();
const SubTypeController = require('../controllers/subTypeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', SubTypeController.getAll);
router.post('/', checkRole('ADMIN'), SubTypeController.create);
router.delete('/:id', checkRole('ADMIN'), SubTypeController.delete);

module.exports = router;
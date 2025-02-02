const Router = require('express');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');
const SliderController = require('../controllers/sliderController');

router.post('/', checkRole('ADMIN'), SliderController.create);
router.get('/', SliderController.getAll);
router.delete('/:id', checkRole('ADMIN'), SliderController.delete);

module.exports = router;
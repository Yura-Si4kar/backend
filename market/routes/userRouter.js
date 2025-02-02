const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', UserController.startSession);
router.post('/admin', UserController.login);
router.get('/auth',authMiddleware, UserController.check);

module.exports = router;
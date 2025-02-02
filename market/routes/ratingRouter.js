const Router = require('express');
const RatingController = require('../controllers/ratingController');
const router = new Router();


router.post('/', RatingController.vote);

module.exports = router;
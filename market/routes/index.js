const Router = require('express');
const router = new Router();
const itemRouter = require('./itemRouter');
const userRouter = require('./userRouter');
const subTypeRouter = require('./subTypeRouter');
const typeRouter = require('./typeRouter');
const sliderRouter = require('./sliderRouter');
const ratingRouter = require('./ratingRouter');

router.use('/', userRouter);
router.use('/slider', sliderRouter)
router.use('/type', typeRouter);
router.use('/sub_type', subTypeRouter);
router.use('/item', itemRouter);
router.use('/rating', ratingRouter);

module.exports = router;
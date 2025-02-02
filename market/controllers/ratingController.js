const ApiError = require("../error/ApiError");
const { Rating, Item } = require("../models/models");

class RatingController {
    async vote(req, res, next) {
        const { userId, itemId, rating } = req.body;
        try {
            const existingVoute = await Rating.findOne({ where: { userId, itemId } });

            if (existingVoute) {
                return next(ApiError.badRequest('Ви вже залишали оцінку'));
            }

            await Rating.create({ userId, itemId, rating });

            const item = await Item.findByPk(itemId);
            const ratings = await Rating.findAll({ where: { itemId }, attributes: ['rating'] });

            const totalRatings = ratings.reduce((acc, val) => acc + val.rating, 0);
            const avarageRatings = totalRatings / ratings.length;

            item.rating = avarageRatings;
            await item.save();

            res.json({ message: 'Вашу оцінку додано' });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при додаванні рейтингу'));
        }
    }
}

module.exports = new RatingController();
const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message }); // виведе помилку, якщо помилка співпадає з статусами з ApiError
    }

    return res.status(500).json({ message: 'Непередбачувана помилка!' }); // виведе помилку, якщо помилка не співпадає з статусами з ApiError
}
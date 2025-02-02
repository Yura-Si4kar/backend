const Models = require('../models/model');
const ApiError = require('../error/ApiError');

class MenuItemsController {
    constructor(category) {
        this.Model = Models[category];
    }
    
    async create(req, res, next) {
        try {
            const list = new this.Model(req.body);
            const result = await list.save();

            res.status(201).json(result);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const list = await this.Model.find().sort({ name: 1 });

            if (!list || list.length === 0) {
                return next(ApiError.notFound('Elements not found'));
            }

            res.status(200).json(list);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateOne(req, res, next) {
        try {
            const result = await this.Model.findByIdAndUpdate(req.params.id, req.body);

            if (!result) {
                return next(ApiError.notFound('Element not found'));
            }

            res.status(200).json(result);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const result = await this.Model.findByIdAndDelete(req.params.id);

            if (!result) {
                return next(ApiError.notFound('Element not found'));
            }

            res.status(200).json(result);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = MenuItemsController;
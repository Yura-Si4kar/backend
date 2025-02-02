const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name, description } = req.body;
        await Type.create({ name, description });
        const types = await Type.findAll()
        return res.json(types);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            const type = await Type.findOne({ where: { id } });
            
            if (!type) {
                return next(ApiError.notFound('Тип не знайдено'));
            }

            await type.destroy();

            const types = await Type.findAll()

            return res.json(types);
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні типу'));
        }
    }
}

module.exports = new TypeController();
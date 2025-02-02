const ApiError = require('../error/ApiError');
const { SubType } = require('../models/models');

class SubTypeController {
    async create(req, res) {
        const { name, typeId } = req.body;

        await SubType.create({ name, typeId });
        const subTypes = await SubType.findAll();

        return res.json(subTypes);
    }

    async getAll(req, res) {
        let { typeId } = req.query;
        let subTypes;

        if (typeId) {
            subTypes = await SubType.findAll({ where: { typeId } });
        } else {
            subTypes = await SubType.findAll();
        }

        return res.json(subTypes);
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            const subType = await SubType.findOne({ where: { id } });
            
            if (!subType) {
                return next(ApiError.notFound('Тип не знайдено'));
            }

            await subType.destroy();

            const subTypes = await SubType.findAll();

            return res.json(subTypes);
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні типу'));
        }
    }
}

module.exports = new SubTypeController();
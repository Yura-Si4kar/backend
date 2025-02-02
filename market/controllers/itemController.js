const { v4 } = require('uuid');
const path = require('path');
const { Item, ItemInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const sharp = require('sharp');
const fs = require('fs');
class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, subTypeId, typeId, info, rating } = req.body;
            const { img } = req.files;
            let fileName = v4() + '.jpg';

            sharp(img.data)
            .jpeg({ quality: 80 })
            .toFile(path.resolve(__dirname, '..', 'static', fileName), (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(info);
                }
            });
            
            const item = await Item.create({ name, price, subTypeId, typeId, img: fileName, rating });

            if (info) {
                info = JSON.parse(info);
                info.forEach(async (el) => {
                    await ItemInfo.create({
                        title: el.title,
                        description: el.description,
                        itemId: item.id,
                    });
                });
            }

            const items = await Item.findAll();
        
            return res.json(items);
        } catch (error) {
            next(ApiError.notFound(error.message));
        }
    }

    async getAll(req, res) {
        let { typeId, subTypeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit -limit
        let items;

        if (!typeId && !subTypeId) {
            items = await Item.findAndCountAll({limit, offset}); // findAndCountAll - функція презначена для пагінації
        }
        if (!typeId && subTypeId) {
            items = await Item.findAndCountAll({where: {subTypeId}, limit, offset});
        }
        if (typeId && !subTypeId) {
            items = await Item.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (typeId && subTypeId) {
            items = await Item.findAndCountAll({where: {typeId, subTypeId}, limit, offset});
        }

        return res.json(items);
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // отримуємо id з router params
            const item = await Item.findOne(
                {
                    where: { id },
                    include: [{model: ItemInfo, as: 'info'}]
                }
            )
            return res.json(item)
        } catch (error) {
            next(ApiError.notFound(error.message));
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const item = await Item.findOne({ where: { id } });

            if (!item) {
                return next(ApiError.notFound('Елемент не знайдено'));
            }

            const imagePath = path.resolve(__dirname, '..', 'static', item.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await item.destroy();

            const items = await Item.findAll();

            return res.json(items);
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні елемента'));
        }
    }
}

module.exports = new ItemController();
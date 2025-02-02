const { v4 } = require("uuid");
const path = require('path');
const { Slider } = require("../models/models");
const ApiError = require("../error/ApiError");
const fs = require('fs');
const sharp = require('sharp');

class SliderController {
    async create(req, res, next) {
        try {
            let { name, text } = req.body;
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

            await Slider.create({ name, text, img: fileName });

            const slides = await Slider.findAll();

            return res.json(slides);
        } catch (error) {
            next(ApiError.notFound(error.message));
        }
    }

    async getAll(req, res) {
        const slides = await Slider.findAll();

        return res.json(slides);
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const slide = await Slider.findOne({ where: { id } });

            if (!slide) {
                return next(ApiError.notFound('Слайд не знайдено'));
            }
            // Видаляємо картинку із папки static
            const imagePath = path.resolve(__dirname, '..', 'static', slide.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            slide.destroy();

            const slides = await Slider.findAll();

            return res.json(slides);
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні елемента'));
        }
    }
}

module.exports = new SliderController();
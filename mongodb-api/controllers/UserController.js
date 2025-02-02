const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Users } = require('../models/model');
const ApiError = require('../error/ApiError');

const generateJWT = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UsersController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            // Перевірка, чи користувач з таким емейлом вже існує 
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return next(ApiError.badRequest('Користувач з таким емейлом вже зареєстрований'))
            }
            // Хешування паролю
            const hashedPassword = await bcrypt.hash(password, 10);
            // Створення нового користувача
            const user = new Users({ email, password: hashedPassword });
            user.save();

            // Генеруємо JWT-токен
            const token = generateJWT(user._id, user.email);
            res.json({ token });
        } catch (e) {
            console.error(e);
            next(ApiError.internal('Помилка реєстрації'));
        }  
    }
    
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            // Пошук користувача за email
            const user = await Users.findOne({ email });
            if (!user) {
                return next(ApiError.unauthorized('Користувача з таким емейлом не знайдено'))
            }

            // Порівняння хешованого паролю
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return next(ApiError.unauthorized('Невірний пароль'));
            }

            // Генеруємо JWT-токен
            const token = generateJWT(user._id, user.email);
            res.json({ token });
        } catch (e) {
            console.error(e);
            next(ApiError.internal('Помилка автентифікації'));
        }
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new UsersController();
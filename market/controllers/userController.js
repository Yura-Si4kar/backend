const { User, Basket } = require('../models/models');
const ApiError = require('../error/ApiError');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { signInUser } = require('../firebase/firebase');
const crypto = require('crypto');

const generateJWT = (id, uniqueId, role) => {
    return jwt.sign(
            { id, uniqueId, role },
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        );
}

class UserController {
    async startSession(req, res, next) {
        try {
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            let uniqueId;

            if (!uniqueId) {
                const hash = crypto.createHash('sha256').update(clientIP).digest('hex');

                uniqueId = hash;

                res.cookie('uniqueId', uniqueId, { maxAge: 86400 * 1000, httpOnly: true });
            }

            const existingUser = await User.findOne({ where: { uniqueId } });

            if (existingUser) {
                const token = generateJWT(existingUser.id, existingUser.uniqueId, existingUser.role);
                return res.json({ token });
            } else {
                const user = await User.create({ uniqueId });
                const [basket, created] = await Basket.findOrCreate({
                    where: { userId: user.id },
                    defaults: { userId: user.id }
                });

                const token = generateJWT(user.id, uniqueId, user.role);
                return res.json({ token });
            }
        } catch (error) {
            next(ApiError.internal(error));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(ApiError.internal('Не коректний логін або пароль!'));
        }

        const uniqueId = crypto.createHash('sha256').update(email + password).digest('hex');

        try {
            const loginRequest = await signInUser(email, password);
            
            if (loginRequest) {
                const user = await User.findOne({ where: { uniqueId } });
                
                if (!user) {
                    await User.create({ uniqueId, role: 'ADMIN' });
                }
                
                const token = generateJWT(user.id, user.uniqueId, user.role);

                return res.json({ token });
            } else {
                return next(ApiError.internal('Не вдалось увійти!'));
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    return next(ApiError.internal('Невірно введений логін!'));
                    break;
                case 'auth/wrong-password':
                    return next(ApiError.internal('Невірно введений пароль!'));
                    break;            
                default:
                    return next(ApiError.internal('Помилка при спробі входу!'));
                    break;
            }
        }
    }

    async check(req, res, next) {
        const existingUser = await User.findOne({ where: { uniqueId: req.user.uniqueId } });

        if (existingUser) {
            const token = generateJWT(existingUser.id, existingUser.uniqueId, existingUser.role);
            return res.json({ token });
        } else {
            const uniqueId = crypto.createHash('sha256').update(v4()).digest('hex');
            const token = generateJWT(req.user.id, uniqueId, req.user.role);
            return res.json({ token });
        }
    }
}

module.exports = new UserController();
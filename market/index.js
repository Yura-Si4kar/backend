require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({origin: '*'})); 
app.use(express.json()); // функція, яка дозволяє додаткові парсити JSON формат
app.use(fileUpload({}));

app.use('/api', router);

const staticPath = path.resolve(__dirname, 'static');

if (!fs.existsSync(staticPath)) {
    fs.mkdirSync(staticPath);
}

app.use(express.static(staticPath)); // Має іти обов'язково після app.use('/api', router)

// Middleware, який працює з помилками, обов'язково має реєструватись в самому кінці
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Working!!!' });
})

const start = async () => {
    try {
        await sequelize.authenticate(); // з допомогою даної функції відбувається підключення до БД
        await sequelize.sync(); // звіряє стан БД із схемами даних
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectToDb = require('./db');
const cors = require('cors');
const router = require('./routers');
const ErrorHandlingMiddleware = require('./middlewares/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', router);

app.use(ErrorHandlingMiddleware);
    
const start = async () => {
    try {
        await connectToDb();
        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();
const mongoose = require('mongoose');

const { categories } = require('../config');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const categoriesSchema = new Schema({
    type: {type: String, required: true},
    img: {type: String, required: true},
    name: {type: String, required: true},
    dsc: {type: String, required: true},
    price: {type: Number, required: true},
    rate: {type: Number, required: true},
    country: { type: String, required: true },
    count: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
})

const tablesSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    order: [{ type: Object }]
})

const personnelsSchema = new Schema({
    name: {type: String, required: true},
    salary: {type: Number, required: true},
    position: {type: String, required: true}
})

const salesSchema = new Schema({
    table: {type: String, required: true},
    waiter: {type: String, required: true},
    order: [{ type: Object }],
    sum: {type: Number, required: true},
})

let Models = {};

categories.forEach((category) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    Models[categoryName] = mongoose.model(category, categoriesSchema);
})

const Users = mongoose.model('users', userSchema);
const Tables = mongoose.model('tables', tablesSchema);
const Personnels= mongoose.model('personnels', personnelsSchema);
const Sales= mongoose.model('sales', salesSchema);

module.exports = {...Models, Tables, Personnels, Sales, Users};
const sequelize = require('../db');

const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    uniqueId: { type: DataTypes.STRING, allowNull: false }
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false }
});

const BasketItem = sequelize.define('basket_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Slider = sequelize.define('slider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue:0 },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const SubType = sequelize.define('sub_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
});

const ItemInfo = sequelize.define('item_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

const TypeSubType = sequelize.define('type_sub', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Basket);
Basket.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket); 

Type.hasMany(Item);
Item.belongsTo(Type);

SubType.hasMany(Item);
Item.belongsTo(SubType);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

Item.hasMany(ItemInfo, {as: 'info'}); // info - назва поля, яке буде в массиву характеристик, для всіх Item
ItemInfo.belongsTo(Item);

Type.belongsToMany(SubType, {through: TypeSubType});
SubType.belongsTo(Type, {through: TypeSubType});

module.exports = { User, Basket, BasketItem, Slider, Item, Type, SubType, Rating, ItemInfo, TypeSubType }
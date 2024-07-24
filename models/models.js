const sequelize = require('../db');

const {DataType, DataTypes} = require('sequelize');

const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'User'}
})


const basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

})

const basketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

})


const device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true, allowNull: false},
    price:{type: DataTypes.INTEGER, allowNull: false},
    rating:{type: DataTypes.INTEGER, defaultValue: 0},
    img:{type: DataTypes.STRING,  allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true, allowNull: false}
})
const brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true, allowNull: false}
})


const rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER,  allowNull: false}
})

const deviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING,  allowNull: false},
    description:{type: DataTypes.STRING,  allowNull: false}
})

const typeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


user.hasOne(basket)
basket.belongsTo(user)


user.hasMany(rating)
rating.belongsTo(user)

basket.hasMany(basketDevice)
basketDevice.belongsTo(basket)

Type.hasMany(device)
device.belongsTo(Type)

brand.hasMany(device)
device.belongsTo(brand)

device.hasMany(rating)
rating.belongsTo(device)

device.hasMany(basketDevice)
basketDevice.belongsTo(device)

device.hasMany(deviceInfo, {as: 'info'});
deviceInfo.belongsTo(device)

Type.belongsToMany(brand, {through: typeBrand})
brand.belongsToMany(Type, {through: typeBrand})

module.exports = {
    user, 
    basket, 
    device, 
    basketDevice, 
    Type, 
    brand, 
    rating, 
    typeBrand, 
    deviceInfo
}




    

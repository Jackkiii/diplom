const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
    full_name: {type: DataTypes.STRING},
    tel: {type: DataTypes.STRING, unique: true},
})

const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const Publication = sequelize.define('publication', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, unique: true},
    date: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING}, //???
    description: {type: DataTypes.STRING}, //???
    link_file: {type: DataTypes.STRING},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
})

Group.hasMany(User)
User.belongsTo(Group)

User.hasMany(Publication)
Publication.belongsTo(User)

Category.hasMany(Publication)
Publication.belongsTo(Category)

module.exports = { // Экспортируем все модели, чтобы в дальнейшем в других файлах мы их могли использовать
    User,
    Group,
    Publication,
    Category
}
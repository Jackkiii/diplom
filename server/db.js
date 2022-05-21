const {Sequelize} = require('sequelize') //импортируем sequelizen, делаем деструкторизацию, так как модуль большой и нужен определенный класс

module.exports = new Sequelize( // В конструкторе будем указывать конфигурацию, тут будем передавать пользователя, пароль и тд
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)

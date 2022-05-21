require('dotenv').config()
const express = require('express') //Импортируем express
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000 //Указываем порт на котором будет работать приложение

const app = express() //Создаем объект
app.use(cors())
app.use(express.json()) //Чтобы приложение могло парсить json формат
app.use('/api', router)

//Обработка ошибок, всегда в конце
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate() // С помощью данной функции будет устанавливаться подключение к БД
        await sequelize.sync() // Ф-уя будет сверять состояние БД со схемой данных
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
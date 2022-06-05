require('dotenv').config()
const express = require('express') //Импортируем express
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const pdf = require('html-pdf')

const pdfTemplate = require('./document')

const PORT = process.env.PORT || 5000 //Указываем порт на котором будет работать приложение

const app = express() //Создаем объект
app.use(cors())
app.use(express.json()) //Чтобы приложение могло парсить json формат
app.use(fileUpload({}))
app.use('/api', router)

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

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
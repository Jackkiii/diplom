require('dotenv').config()
const express = require('express') //Импортируем express
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const pdf = require('html-pdf')
const fs = require('fs');
const Pdfmake = require('pdfmake');

const pdfTemplate = require('./document')

const PORT = process.env.PORT || 5000 //Указываем порт на котором будет работать приложение

const app = express() //Создаем объект
app.use(cors())
app.use(express.json()) //Чтобы приложение могло парсить json формат
app.use(fileUpload({}))
app.use('/api', router)

app.post('/create-pdf', (req, res) => {
    const fonts = {
        Roboto: {
            normal: 'fonts/roboto/Roboto-Regular.ttf',
            bold: 'fonts/roboto/Roboto-Medium.ttf',
            italics: 'fonts/roboto/Roboto-Italic.ttf',
            bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf'
        }
    };
    let pdfmake = new Pdfmake(fonts);

    const makePDF = (datas) => {
        let aPromise = new Promise((resolve, reject) => {
            console.time('creatingPDF')

            let {name, group, userId, list} = req.body
            console.log('req body',req.body)

            let listWithPublication = app.get(`http://localhost:5000/api/publication/user/${userId}`)
            //console.log(req)

            let content = [{
                text: 'Список публикаций',
                alignment: 'center',
                fontSize: 22,
                marginBottom:10,
            }]

            content.push({text: `Имя студента: ${name}`, alignment: 'right'})
            content.push({text: `Группа студента: ${group}`, marginBottom:15, alignment: 'right'})

            for (let i = 0; i < 30; i++) {
                content.push({
                    text: `Название публикации: ${group}`,
                })
                content.push({
                    text: `Год публикации: ${group}`,
                    marginBottom: 6
                })
            }

            let docDefination = {
                content
            }

            let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});
            let writeStream = fs.createWriteStream('pdfs/document.pdf');

            pdfDoc.pipe(writeStream);
            pdfDoc.end();

            writeStream.on('finish', function () {
                console.timeEnd('creatingPDF')
                resolve('pdfs/document.pdf');
            });

        })

        return aPromise;
    }

    makePDF({
        data: "asd needed"
    }).then(file => {
        console.log(file);
    })
})

//app.post('/create-pdf', (req, res) => {
//    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
//        if(err) {
//            res.send(Promise.reject());
//        }
//
//        res.send(Promise.resolve());
//    });
//});
//
//app.get('/fetch-pdf', (req, res) => {
//    res.sendFile(`${__dirname}/result.pdf`)
//})

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
const {Publication} = require('../models/models')
const ApiError = require('../error/ApiError');
const path = require('path')

class PublicationController {
    async create(req, res, next){
        try {
            const {userId, name, categoryId, date, author} = req.body
            const {link_file} = req.files
            let fileName = name + '.pdf'
            link_file.mv(path.resolve(__dirname, '..', 'uploads', fileName))
            const publication = await Publication.create({userId: userId, name: name,
                categoryId: categoryId, date: date, link_file: fileName, author: author})
            return res.json(publication)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async downloadFile(req, res, next) {
        try{
            //const {link_file} = req.body
            const {link_file} = req.params
            const file = await Publication.findOne({where: {link_file}})
            const pathFile = path.resolve(__dirname, '..', 'uploads', file.link_file)
            //return res.json(file.link_file)
            return res.download(pathFile, file.link_file)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {name, categoryId, date, limit, page} = req.query
        page = page || 1
        limit = limit || 20

        let offset = page * limit - limit       //отступ, сколько публикаций нужно пропустить

        let publication
        if (!name && !categoryId && !date){     //---
            publication = await Publication.findAndCountAll({limit, offset})
        }
        if (name && !categoryId && !date){      //+--
            publication = await Publication.findAndCountAll({where: {name}, limit, offset})
        }
        if (!name && categoryId && !date){      //-+-
            publication = await Publication.findAndCountAll({where: {categoryId}, limit, offset})
        }
        if (!name && !categoryId && date){      //--+
            publication = await Publication.findAndCountAll({where: {date}, limit, offset})
        }
        if (name && categoryId && !date){       //++-
            publication = await Publication.findAndCountAll({where: {name, categoryId}, limit, offset})
        }
        if (!name && categoryId && date){       //-++
            publication = await Publication.findAndCountAll({where: {categoryId, date}, limit, offset})
        }
        if (name && !categoryId && date){       //+-+
            publication = await Publication.findAndCountAll({where: {name, date}, limit, offset})
        }
        if (name && categoryId && date){        //+++
            publication = await Publication.findAndCountAll({where: {name, categoryId, date}, limit, offset})
        }
        return res.json(publication)
    }

    async getListUserId(req, res, next) {
        try{
            let {userId} = req.params

            const publication = await Publication.findAll({where: {userId}})

            return res.json(publication)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }

    async getOne(req, res){
        const {id} = req.params
        const publication = await Publication.findOne({where: {id}})
        return res.json(publication)
    }
}

module.exports = new PublicationController()
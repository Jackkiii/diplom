const {Publication} = require('../models/models')
const ApiError = require('../error/ApiError');

class PublicationController {
    async create(req, res, next){
        try {
            const {userId, name, categoryId, date, link_file} = req.body
            const publication = await Publication.create({userId, name, categoryId, date, link_file})
            return res.json(publication)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {name, categoryId, date, limit, page} = req.query
        page = page || 1
        limit = limit || 15

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

    async getOne(req, res){
        const {id} = req.params
        const publication = await Publication.findOne({where: {id}})
        return res.json(publication)
    }
}

module.exports = new PublicationController()
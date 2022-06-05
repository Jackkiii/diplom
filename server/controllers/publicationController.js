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
        let {name, categoryId, date, userId, limit, page} = req.query
        page = page || 1
        limit = limit || 4

        let offset = page * limit - limit       //отступ, сколько публикаций нужно пропустить

        let publication
        if (!name && !categoryId && !date && !userId){     //----
            publication = await Publication.findAndCountAll({limit, offset})
        }

        if (name && !categoryId && !date && !userId){      //+---
            publication = await Publication.findAndCountAll({where: {name}, limit, offset})
        }
        if (!name && categoryId && !date && !userId){      //-+--
            publication = await Publication.findAndCountAll({where: {categoryId}, limit, offset})
        }
        if (!name && !categoryId && date && !userId){      //--+-
            publication = await Publication.findAndCountAll({where: {date}, limit, offset})
        }
        if (!name && !categoryId && !date && userId){      //---+
            publication = await Publication.findAndCountAll({where: {userId}, limit, offset})
        }

        if (name && categoryId && !date && !userId){       //++--
            publication = await Publication.findAndCountAll({where: {name, categoryId}, limit, offset})
        }
        if (name && !categoryId && date && !userId){       //+-+-
            publication = await Publication.findAndCountAll({where: {name, date}, limit, offset})
        }
        if (name && !categoryId && !date && userId){       //+--+
            publication = await Publication.findAndCountAll({where: {name, userId}, limit, offset})
        }
        if (!name && categoryId && date && !userId){       //-++-
            publication = await Publication.findAndCountAll({where: {categoryId, date}, limit, offset})
        }
        if (!name && categoryId && !date && userId){       //-+-+
            publication = await Publication.findAndCountAll({where: {categoryId, userId}, limit, offset})
        }
        if (!name && !categoryId && date && userId){       //--++
            publication = await Publication.findAndCountAll({where: {date, userId}, limit, offset})
        }

        if (name && categoryId && date && !userId){       //+++-
            publication = await Publication.findAndCountAll({where: {name, categoryId, date}, limit, offset})
        }
        if (name && !categoryId && date && userId){       //+-++
            publication = await Publication.findAndCountAll({where: {name, date, userId}, limit, offset})
        }
        if (name && categoryId && !date && userId){       //++-+
            publication = await Publication.findAndCountAll({where: {name, categoryId, userId}, limit, offset})
        }
        if (!name && categoryId && date && userId){       //-+++
            publication = await Publication.findAndCountAll({where: {categoryId, date, userId}, limit, offset})
        }

        if (name && categoryId && date && userId){        //++++
            publication = await Publication.findAndCountAll({where: {name, categoryId, date, userId}, limit, offset})
        }
        return res.json(publication)
    }

    //async searchByDate(req, res, next) {
    //    try {
    //        let {limit, page} = req.query
    //        page = page || 1
    //        limit = limit || 4
    //        let offset = page * limit - limit
//
    //        const searchName = req.query
    //        let publications = await Publication.findAndCountAll(({limit, offset}))
    //        publications = publications.filter(publications => publications.date.includes(searchName))
    //        return res.json(publications)
    //    } catch (e) {
    //        next(ApiError.badRequest(e))
    //    }
    //}

    async getListData(req, res){
        const {date} = req.params
        let listDataTmp = await Publication.findAndCountAll()
        //const listData = await Publication.findAndCountAll({where: {date}})
        listDataTmp.rows = listDataTmp.rows.filter(listData => listData.date.includes(date))
        return res.json(listDataTmp)
        console.log(listDataTmp.rows)
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
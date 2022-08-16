const {Publication} = require('../models/models')
const ApiError = require('../error/ApiError');
const path = require('path')

class PublicationController {
    async create(req, res, next){
        try {
            const {userId, name, categoryId, date, author, group_name} = req.body
            const {link_file} = req.files
            let fileName = name + '.pdf'
            link_file.mv(path.resolve(__dirname, '..', 'uploads', fileName))
            const publication = await Publication.create({userId: userId, name: name,
                categoryId: categoryId, date: date, link_file: fileName, author: author, group_name: group_name})
            return res.json(publication)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async downloadFile(req, res, next) {
        try{
            //const {link_file} = req.body
            const {link_file} = req.params
            //const file = await Publication.findOne({where: {link_file}})
            const pathFile = path.resolve(__dirname, '..', 'uploads', link_file)
            //return res.json(file.link_file)
            return res.download(pathFile, link_file)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {author, categoryId, date, group_name, name, limit, page} = req.query
        page = page || 1
        limit = limit || 4

        let offset = page * limit - limit       //отступ, сколько публикаций нужно пропустить

        let publication
        if (!author && !categoryId && !date && !group_name && !name){     //-----
            publication = await Publication.findAndCountAll({limit, offset})
        }

        if (!author && !categoryId && !date && !group_name && name){      //----+
            publication = await Publication.findAndCountAll({where: {name}, limit, offset})
        }
        if (!author && !categoryId && !date && group_name && !name){      //---+-
            publication = await Publication.findAndCountAll({where: {group_name}, limit, offset})
        }
        if (!author && !categoryId && date && !group_name && !name){      //--+--
            publication = await Publication.findAndCountAll({where: {date}, limit, offset})
        }
        if (!author && categoryId && !date && !group_name && !name){      //-+---
            publication = await Publication.findAndCountAll({where: {categoryId}, limit, offset})
        }
        if (author && !categoryId && !date && !group_name && !name){      //+----
            publication = await Publication.findAndCountAll({where: {author}, limit, offset})
        }

        if (author && categoryId && !date && !group_name && !name){       //++---
            publication = await Publication.findAndCountAll({where: {author, categoryId}, limit, offset})
        }
        if (author && !categoryId && date && !group_name && !name){       //+-+--
            publication = await Publication.findAndCountAll({where: {author, date}, limit, offset})
        }
        if (author && !categoryId && !date && group_name && !name){       //+--+-
            publication = await Publication.findAndCountAll({where: {author, group_name}, limit, offset})
        }
        if (author && !categoryId && !date && !group_name && name){       //+---+
            publication = await Publication.findAndCountAll({where: {author, name}, limit, offset})
        }

        if (!author && categoryId && !date && !group_name && name){       //-+--+
            publication = await Publication.findAndCountAll({where: {categoryId, name}, limit, offset})
        }
        if (!author && categoryId && !date && group_name && !name){       //-+-+-
            publication = await Publication.findAndCountAll({where: {categoryId, group_name}, limit, offset})
        }
        if (!author && categoryId && date && !group_name && !name){       //-++--
            publication = await Publication.findAndCountAll({where: {categoryId, date}, limit, offset})
        }
        if (!author && !categoryId && !date && group_name && name){       //---++
            publication = await Publication.findAndCountAll({where: {group_name, name}, limit, offset})
        }
        if (!author && !categoryId && date && !group_name && name){       //--+-+
            publication = await Publication.findAndCountAll({where: {date, name}, limit, offset})
        }
        if (!author && !categoryId && date && group_name && !name){       //--++-
            publication = await Publication.findAndCountAll({where: {date, group_name}, limit, offset})
        }

        if (!author && categoryId && !date && group_name && name){       //-+-++
            publication = await Publication.findAndCountAll({where: {categoryId, group_name, name}, limit, offset})
        }
        if (!author && categoryId && date && !group_name && name){       //-++-+
            publication = await Publication.findAndCountAll({where: {categoryId, date, name}, limit, offset})
        }
        if (!author && categoryId && date && group_name && !name){       //-+++-
            publication = await Publication.findAndCountAll({where: {categoryId, date, group_name}, limit, offset})
        }
        if (!author && !categoryId && date && group_name && name){       //--+++
            publication = await Publication.findAndCountAll({where: {date, group_name, name}, limit, offset})
        }
        if (author && !categoryId && !date && group_name && name){       //+--++
            publication = await Publication.findAndCountAll({where: {author, group_name, name}, limit, offset})
        }
        if (author && categoryId && !date && !group_name && name){       //++--+
            publication = await Publication.findAndCountAll({where: {author, categoryId, name}, limit, offset})
        }
        if (author && !categoryId && date && !group_name && name){       //+-+-+
            publication = await Publication.findAndCountAll({where: {author, date, name}, limit, offset})
        }
        if (author && !categoryId && date && group_name && !name){       //+-++-
            publication = await Publication.findAndCountAll({where: {author, date, group_name}, limit, offset})
        }
        if (author && categoryId && !date && group_name && !name){       //++-+-
            publication = await Publication.findAndCountAll({where: {author, categoryId, group_name}, limit, offset})
        }
        if (author && categoryId && date && !group_name && !name){       //+++--
            publication = await Publication.findAndCountAll({where: {author, categoryId, date}, limit, offset})
        }

        if (author && categoryId && !date && group_name && name){       //++-++
            publication = await Publication.findAndCountAll({where: {author, categoryId, group_name, name}, limit, offset})
        }
        if (author && categoryId && date && !group_name && name){        //+++-+
            publication = await Publication.findAndCountAll({where: {author, categoryId, date, name}, limit, offset})
        }
        if (author && categoryId && date && group_name && !name){        //++++-
            publication = await Publication.findAndCountAll({where: {author, categoryId, date, group_name}, limit, offset})
        }
        if (!author && categoryId && date && group_name && name){        //-++++
            publication = await Publication.findAndCountAll({where: {categoryId, date, group_name, name}, limit, offset})
        }
        if (author && !categoryId && date && group_name && name){        //+-+++
            publication = await Publication.findAndCountAll({where: {author, date, group_name, name}, limit, offset})
        }
        if (author && categoryId && date && group_name && name){        //+++++
            publication = await Publication.findAndCountAll({where: {author, categoryId, date, group_name, name}, limit, offset})
        }
        return res.json(publication)
    }

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

    async getOneByName(req, res){
        const {name} = req.params
        const publication = await Publication.findOne({where: {name}})
        return res.json(publication.name)
    }
}

module.exports = new PublicationController()
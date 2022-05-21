const {Group} = require('../models/models')
const ApiError = require('../error/ApiError');

class GroupController {
    async create(req, res, next){
        try {
            const {name} = req.body
            const group = await Group.create({name})
            return res.json(group)
        } catch (e) {
            next(ApiError.badRequest('Ошибка при добавлении группы'))
        }
    }

    async delete(req, res, next){
        try {
            const {name} = req.body
            const group = await Group.findOne({where: {name}})
            await group.destroy()
            return res.json('Группа ' + name + ' удалена')
        } catch (e) {
            return next(ApiError.badRequest('Ошибка: такой группы не существует'))
        }

    }

    async getAll(req, res){
        const groups = await Group.findAll()
        return res.json(groups)
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params
            const group = await Group.findOne({where: {id}})
            return res.json(group)
        } catch (e) {
            next(ApiError.badRequest('Ошибка: группа не найдена'))
        }
    }
}

module.exports = new GroupController()
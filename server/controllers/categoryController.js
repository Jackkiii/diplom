const {Category} = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res, next){
        try {
            const {name} = req.body
            if (!name) {
                return next(ApiError.badRequest('Ошибка: пустая строка'))
            }
            const candidateName = await Category.findOne({where: {name}})
            if(candidateName) {
                return next(ApiError.badRequest('Такая категория уже сущестсвует'))
            }
            const category = await Category.create({name})
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest('Ошибка при добавлении категории'))
        }
    }

    async delete(req, res, next){
        try {
            const {name} = req.body
            const category = await Category.findOne({where: {name}})
            await category.destroy()
            return res.json('Категория ' + name + ' удалена')
        } catch (e) {
            return next(ApiError.badRequest('Ошибка: такой категории не существует'))
        }
    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getOne(req, res){
        const {id} = req.params
        const category = await Category.findOne({where: {id}})
        return res.json(category)
    }
}

module.exports = new CategoryController()
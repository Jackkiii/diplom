const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        try {
            const {email, password, full_name, tel, groupId, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email: email, groupId: groupId, password: hashPassword, role: role,
                full_name: full_name, tel: tel})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest('Ошибка при регистрации'))
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let validPassword = bcrypt.compareSync(password, user.password)
            console.log(validPassword)
            if (!validPassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest('Ошибка при авторизации'))
        }
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
const apiErr = require ('../err/apiErr')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const {user, basket} = require ('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign (
    {id, email , role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class userController {
    async registration (req, res, next) {
      const {email, password, role} = req.body;
      if(!email||!password) {
        return next(apiErr.BadRequest('Неккоректный email или пароль'))
      }

      const candidate = await user.findOne(
        {
          where: {email},

        }
      )

      if(candidate) {
        return next(apiErr.BadRequest('User with this password already registred'))
      }

      const hashPassword = await bcrypt.hash(password, 5)

      const User = await user.create({email, role, password: hashPassword})

      const Basket = await basket.create ({userId: User.id})

      const token = generateJwt(User.id, User.email, User.role)


       return res.json({token})
    }
    // =============================





    async login (req, res, next) {
        const {email, password} = req.body;
        const User = await user.findOne ({
          where: {email},
        })
        if(!User) {
          return next(apiErr.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, User.password)
        if (!comparePassword) {
          return next(apiErr.internal('Неправильный пароль'))
        }

        const token = generateJwt(User.id, User.email, User.role)
        return res.json({token})
    }






    // ---------------------------
    async check (req, res, next) {
     
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({token})
    }
}


module.exports = new userController()
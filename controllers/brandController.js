const {brand} = require ('../models/models')
const apiErr = require ('../err/apiErr')

class brandController {
    async create (req, res) {
        const {name} = req.body
        const Brand = await brand.create({name})
        return res.json (Brand)
    }

    async getAll (req, res) {
        const brands = await brand.findAll()
        return res.json(brands)
    }


}


module.exports = new brandController()
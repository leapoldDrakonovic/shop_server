const uuid = require ('uuid');
const path = require('path');
const {device, deviceInfo} = require ('../models/models')
const apiErr = require ('../err/apiErr')

class deviceController {
    async create (req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const{img} = req.files;
            let fileName = uuid.v4() + ".jpg"

            
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const Device = await device.create({name, price, brandId, typeId, img: fileName})
    
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    deviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    }) 
                });
            }
    
           
    
            return res.json(Device)
        } catch (e) {
            next(apiErr.BadRequest(e.message))
        }
    }

    async getAll (req, res) {
        let {brandId, typeId, limit, page} = req.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page*limit-limit;

        let Devices;
        if (!brandId && !typeId) {
            Devices = await device.findAndCountAll({limit, offset})
        }

        if (brandId && !typeId) {
            Devices = await device.findAndCountAll({where:{brandId}, limit, offset})
        }

        if (!brandId && typeId) {
            Devices = await device.findAndCountAll({where:{typeId}, limit, offset})
        }

        if (brandId && typeId) {
            Devices = await device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }

        return res.json(Devices)
    }

    async getOne (req, res) {
        const {id} = req.params;
        const Device = await device.findOne(
            {
            where: {id},
            include: [{model: deviceInfo, as: 'info'}]
            },
        )
        return res.json(Device)
    }


}


module.exports = new deviceController()
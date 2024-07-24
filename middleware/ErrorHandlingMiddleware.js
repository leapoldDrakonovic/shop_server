const {apiErr} = require ('../err/apiErr.js');


module.exports = function (err, req, res, next) {
    if (err instanceof apiErr) {
       return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Unknown error'})
}
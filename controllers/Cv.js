const mongoDB = require('../models/Mongo')

const responseObject = (statusCode = null, message = null, data = null, reason = null) => ({
    statusCode: statusCode,
    message: message,
    data: data,
    reason: reason
})

exports.storeCv = async (req, res) => {
    let cvData = req.body.cv || false
    if( !cvData ) return res.json(responseObject(403, "Bad Request", null, "CV Data must included"))
    try{
        let cvObject = JSON.parse(cvData)
        let cvModel = await mongoDB.model('cv')
        let result = await cvModel.findOneAndUpdate(cvObject)
        if( !result ){
            await cvModel.insertMany(cvObject)
        }
        return res.json(responseObject(200, "OK!", null, null))
    }catch(exception){
        return res.json(responseObject(500, "Internal Server Error", null, `${exception.message}`))
    }
    
}

exports.getCv = async (req, res) => {
    let cvId = req.params['cvId'] || false
    if( !cvId ) return res.json(responseObject(403, "Bad Request", null, "CV ID must included"))
    try{
        let cvModel = await mongoDB.model('cv')
        let cvResult = await cvModel.findOne({'cv_id': cvId})
        if( cvResult ) return res.json(responseObject(200, "OK", cvResult, null))
        return res.json(responseObject(404, "Not Found", null, "CV Data Not Found"))
    }catch(exception){
        return res.json(responseObject(500, "Internal Server Error", null, `${exception.message}`))
    }
}
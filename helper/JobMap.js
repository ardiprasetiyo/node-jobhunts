const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const mongoDB = require('../models/Mongo');

exports.category = async () => {
    let jobCategoryModel = await mongoDB.model('job_category')
    let jobCategory = await jobCategoryModel.find({})
        jobCategory = jobCategory.map(category => new Object({search_id: category.search_id, id: category._id}))

    // Map will store in a object, and the keys will be the search_id
    let categoryMap = new Object()
    
    for( let category of jobCategory ){
        let categoryId = Object.keys(category.search_id)
        for( let id of categoryId ){
            let categoryCode = category.search_id[id]
            if( !Object.keys(categoryMap).includes(id) ) categoryMap[id] = new Map()
            for( let code of categoryCode){
                categoryMap[id].set(code, ObjectId(category.id))
            }
        }
    }

    return categoryMap

}

exports.location = async () => {
    let jobLocationModel = await mongoDB.model('job_location')
    let jobLocation  = await jobLocationModel.find({})
        jobLocation  = jobLocation.map(location => new Object({id: location._id, search_id: location.search_id})) 
    let jobMap = new Object()

    for( let location of jobLocation ){
        let locationId = Object.keys(location.search_id)
        for( id of locationId ){
            if( !Object.keys(jobMap).includes(id) ) jobMap[id] = new Map()
            jobMap[id].set(location.search_id[id], location.id)
        }
    }

    return jobMap
}
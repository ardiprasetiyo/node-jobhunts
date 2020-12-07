const mongo = require('mongoose')
const Schema = mongo.Schema
const ObjectId = mongo.SchemaTypes.ObjectId

const registeredCollections = [
    {
        name: 'job_category',
        schema: new Schema({
            name: {type: String, required: true},
            alias: {type: String, required: true},
            search_id: {type: Object, required: true},
            search_keywords: {type: Array, required: true}
        })
    },
    {
        name: 'job_location',
        schema: new Schema({
            name: {type: String, required: true},
            alias: {type: String, required: true},
            province: {type: String, required: true},
            country: {type: String, required: true},
            search_id: {type: Object, required: true}
        })
    },
    {
        name: 'job_catalogue',
        schema: new Schema({
            title: {type: String, required: true},
            type: {type: String, required: true},
            category: ObjectId,
            is_vocational: {type: Boolean, required: true},
            salary: {type: Object, required: true},
            qualification: {type: String, required: true},
            description: {type: String, required: true},
            job_source: {type: String, required: true},
            job_url: {type: String, required: true},
            company: {type: Object, required: true},
            location: ObjectId
        })
    }
]

const config = new Object({
    params: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    url: 'mongodb://127.0.0.1:27017/jobhunts'
})

const getCollection = (collectionName) => {
    const collections = [...registeredCollections]
    const collection = collections.filter(collection => collection.name == collectionName)
    if( collection.length > 0 ) return collection[0]
    return false
}


exports.connect = async () => {
    try{
        await mongo.connect(config.url, {...config.params})
        console.log(`[INFO] MongoDB connected`)
    }catch(exception){
        console.log(`[INFO] MongoDB doesn't connect to database with exception: ${exception.message}`)
    }
}

exports.model = async(collectionName='') => {
    if( !collectionName || typeof collectionName != 'string' ) return false
    const collection = getCollection(collectionName)
    if( collection ) return mongo.model(collection.name, collection.schema, collection.name)
    return false
}

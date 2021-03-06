const mongo = require('mongoose')
const Schema = mongo.Schema
const ObjectId = mongo.SchemaTypes.ObjectId

const registeredCollections = [{
    name: 'job_category',
    schema: new Schema({
        name: {
            type: String,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        search_id: {
            type: Object,
            required: true
        },
        search_keywords: {
            type: Array,
            required: true
        }
    })
},
{
    name: 'cv',
    schema: new Schema({
        cv_id: {
            type: String,
            required: true
        },
        fullname: {
            type: String
        },
        address: {
            type: Object
        },
        phoneNumbers: {
            type: Array
        },
        socialMedia: {
            type: Array
        },
        educations: {
            type: Array
        },
        skills: {
            type: Array
        },
        experience: {
            type: Object
        },
        achivements: {
            type: Array
        }
    })
},
{
    name: 'job_location',
    schema: new Schema({
        name: {
            type: String,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        search_id: {
            type: Object,
            required: true
        }
    })
},
{
    name: 'job_catalogue',
    schema: new Schema({
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: null
        },
        category: ObjectId,
        is_vocational: {
            type: Boolean,
            required: true
        },
        salary: {
            type: Object
        },
        qualification: {
            type: String
        },
        description: {
            type: String
        },
        job_source: {
            type: String,
            required: true
        },
        job_url: {
            type: String,
            required: true
        },
        company: {
            type: Object,
            required: true
        },
        tags: {
            type: Array
        },
        location: ObjectId,
        posted_date: {
            type: Date,
            default: null
        },
        expired_date: {
            type: Date,
            default: null
        }
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
    url: process.env.MONGODB_URL
})

const getCollection = (collectionName) => {
    const collections = [...registeredCollections]
    const collection = collections.filter(collection => collection.name == collectionName)
    if (collection.length > 0) return collection[0]
    return false
}


exports.connect = async () => {
    while (true) {
        try {
            await mongo.connect(config.url, {
                ...config.params
            })
            console.log(`[INFO] MongoDB connected`)
            break;
        } catch (exception) {
            console.log(`[ERROR] MongoDB doesn't connect to database with exception: ${exception.message}. Retrying ...`)
        }
    }
}

exports.model = async (collectionName = '') => {
    if (!collectionName || typeof collectionName != 'string') return false
    const collection = getCollection(collectionName)
    if (collection) return mongo.model(collection.name, collection.schema, collection.name)
    return false
}
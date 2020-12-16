const jobstreetScraper = require('../scraper/Jobstreet')
const kalibrrScraper = require('../scraper/Kalibrr')
const glintsScraper = require('../scraper/Glints')

const responseObject = (statusCode = null, message = null, data = null, reason = null) => ({
    statusCode: statusCode,
    message: message,
    data: data,
    reason: reason
})
const jobSourceList = ['JOBSTREET', 'KALIBRR', 'GLINTS']

const mongoDB = require('../models/Mongo')

const filterValidJobSources = (jobSources) => {
    if (!Array.isArray(jobSources)) return false
    return jobSources.filter(source => jobSourceList.includes(source.toUpperCase())).map(source => source.toUpperCase())
}

const stringToArray = (arrayString = '') => {
    if (typeof arrayString != 'string') return false
    try {
        return JSON.parse(arrayString)
    } catch {
        return false
    }
}

exports.jobCatalogueSchema = ({
    ...args
}) => {
    let template = new Object({
        title: '',
        type: '',
        category: null,
        is_vocational: false,
        salary: {
            min: 0,
            max: 0,
            type: '',
            currency: ''
        },
        qualification: '',
        description: '',
        job_source: '',
        job_url: '',
        company: {
            name: '',
            description: '',
            website: '',
            logo: '',
        },
        tags: [],
        location: '',
        posted_date: '',
        expired_date: ''
    })

    for (let key of Object.keys(args)) {
        if (Object.keys(template).includes(key)) {
            template[key] = args[key]
        }
    }

    return template
}

exports.updateJobCatalogue = async (req, res) => {
    let jobSources = req.body['job-sources'] || []

    jobSources = stringToArray(jobSources)
    if (!jobSources) return res.json(responseObject(400, "Bad Request", null, "Invalid request body, no job sources selected"))

    jobSources = filterValidJobSources(jobSources)
    let jobCatalogue = []

    if (jobSources.includes('JOBSTREET')) {
        jobCatalogue.push(jobstreetScraper.getJobs())
    }

    if (jobSources.includes('KALIBRR')) {
        jobCatalogue.push(kalibrrScraper.getJobs())
    }

    if (jobSources.includes('GLINTS')) {
        jobCatalogue.push(glintsScraper.getJobs())
    }

    jobCatalogue = await Promise.all(jobCatalogue)
    res.json(responseObject(200, 'OK!'))

}

const resultObject = ({
    ...args
}) => new Object({
    isError: {
        status: args.isError || false,
        reason: args.reason || null
    },
    data: args.data || null
})

const getJobCatalogue = async ({
    ...args
}) => {
    const searchQuery = args.searchQuery
    const isVocational = args.vocationalLevel
    const categories = args.jobCategory

    // Pagination
    const page = args.page - 1
    const limit = 30
    const offset = page * limit

    const jobCatalogueModel = await mongoDB.model('job_catalogue')
    let aggregateFacet = []
    let aggregateData = {
        $match: {}
    }

    if (isVocational) aggregateData.$match.is_vocational = true
    if (searchQuery) aggregateData.$match.$text = {
        $search: searchQuery
    }

    // Relation with job category
    aggregateFacet.push({
        $lookup: {
            from: 'job_category',
            localField: 'category',
            foreignField: '_id',
            as: 'category_detail'
        }
    })

    // Relation with job location
    aggregateFacet.push({
        $lookup: {
            from: 'job_location',
            localField: 'location',
            foreignField: '_id',
            as: 'location_detail'
        }
    })

    // filter by categories
    if (categories.length > 0) {
        let categoryQuery = {
            $match: {
                $or: []
            }
        }

        let categoryMatch = {
            category_detail: {
                $elemMatch: new Object()
            }
        }

        for (let category of categories) {
            let matchCategory = {
                ...categoryMatch
            }
            matchCategory.category_detail.$elemMatch.alias = category
            categoryQuery.$match.$or.push(matchCategory)
        }

        aggregateFacet.push(categoryQuery)
    }

    // Aggregate Count
    let aggregateCount = [...aggregateFacet]
    aggregateCount.push({
        $group: {
            _id: null,
            total_jobs: {
                $sum: 1
            }
        }
    })

    // Limiting and Skiping Query
    aggregateFacet.push({
        $skip: offset
    })
    aggregateFacet.push({
        $limit: limit
    })

    // Filtering category detail field
    aggregateFacet.push({
        $project: {
            category_detail: {
                search_id: 0,
                search_keywords: 0
            },
            location_detail: {
                search_id: 0,
                search_keywords: 0
            }
        }
    })

    try {
        const jobs = await jobCatalogueModel.aggregate([aggregateData, {
            $facet: {
                data: aggregateFacet,
                count: aggregateCount
            }
        }])
        return resultObject({
            data: jobs,
            isError: false
        })
    } catch (exception) {
        return resultObject({
            isError: true,
            reason: exception.message
        })
    }

}

exports.getJobs = async (req, res) => {
    let queryParam = req.query
    let page = queryParam.page || 1
    let searchQuery = queryParam.searchQuery || ''
    let jobCategory = queryParam.category || []

    // if job category not an array assign its value to array
    if (!Array.isArray(jobCategory)) jobCategory = [jobCategory]

    const vocationalLevel = queryParam.vocationalLevel == '1' ? true : false
    const jobs = await getJobCatalogue({
        page: page,
        searchQuery: searchQuery,
        jobCategory: jobCategory,
        vocationalLevel: vocationalLevel
    })

    if (jobs.isError.status) {
        res.json(responseObject(500, 'Internal Server Error', null, jobs.isError.reason))
        return
    }

    res.json(responseObject(200, 'OK!', jobs.data, null))
}
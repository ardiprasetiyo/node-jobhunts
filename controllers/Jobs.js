const jobstreetScrapper = require('../scraper/Jobstreet')
const kalibrrScrapper = require('../scraper/Kalibrr')

const responseObject = (statusCode=null, message=null, data=null, reason=null) => ({statusCode: statusCode, message: message, data: data, reason: reason})
const jobSourceList = ['JOBSTREET', 'KALIBRR']

const filterValidJobSources = (jobSources) => {
    if( !Array.isArray(jobSources) ) return false
    return jobSources.filter(source => jobSourceList.includes(source.toUpperCase())).map(source => source.toUpperCase())
}

const stringToArray = (arrayString='') => {
    if( typeof arrayString != 'string' ) return false
    try{ return JSON.parse(arrayString) }catch{ return false }
}

exports.jobCatalogueSchema = ({...args}) => {
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
    
    for( let key of Object.keys(args) ){
        if( Object.keys(template).includes(key) ){
            template[key] = args[key]
        }
    }

    return template
}

exports.updateJobCatalogue = async (req, res) => {
    let jobSources = req.body['job-sources'] || []

    jobSources = stringToArray(jobSources)
    if( !jobSources ) return res.json(responseObject(400, "Bad Request", null, "Invalid request body, no job sources selected"))

    jobSources = filterValidJobSources(jobSources)
    let jobCatalogue = []

    if( jobSources.includes('JOBSTREET') ){
        jobCatalogue.push(jobstreetScrapper.getJobs())
    }

    if( jobSources.includes('KALIBRR') ){
        jobCatalogue.push(kalibrrScrapper.getJobs())
    }
    
    jobCatalogue = await Promise.all(jobCatalogue)
    res.json(responseObject(200, 'OK!'))

}
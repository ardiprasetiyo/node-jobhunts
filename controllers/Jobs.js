const jobstreetScrapper = require('../scraper/Jobstreet')

const responseObject = (statusCode=null, message=null, data=null, reason=null) => ({statusCode: statusCode, message: message, data: data, reason: reason})


const filterValidJobSources = (jobSources) => {
    if( !Array.isArray(jobSources) ) return false
    return jobSources.filter(source => ['JOBSTREET'].includes(source.toUpperCase()))
}

const stringToArray = (arrayString='') => {
    if( typeof arrayString != 'string' ) return false
    try{ return JSON.parse(arrayString) }catch{ return false }
}

exports.jobCatalogueSchema = () => {
    return new Object({
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
        location: ''
    })
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
    
    jobCatalogue = await Promise.all(jobCatalogue)
    res.json(responseObject(200, 'OK!'))

}
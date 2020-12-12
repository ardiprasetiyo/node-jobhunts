const request = require('../helper/Request')
const JobMap = require('../helper/JobMap')
const mongoDB = require('../models/Mongo')
const jobsController = require('../controllers/Jobs')
const APISchema = require('./APISchema/JobStreetAPISchema')
const moment = require('moment')

const scrapeJobDetails = async (jobsId) => {
    console.log(`[INFO] Jobstreet - Scrape Detail Job : Scraping jobs detail info ...`)
    let jobs = []
    
    while(true){
        for( let jobId of jobsId ){
            jobs.push(request(APISchema.getJobDetailSchema(jobId)))
        }
        
        jobs = await Promise.all(jobs)
        // filter an error request then get the request body data to get jobId.
        let errors = jobs.filter(job => job.errors.status).map(request => JSON.parse(request.errors.request_config.data).variables.jobId)
        // it means retrying to request again the error request by assigning errors to jobsId
        jobsId = errors

        jobs = jobs.filter(job => !job.errors.status)
        if( errors.length < 1 ) break // stop when no errors found
        console.log(`[WARNING] Jobstreet - Scrape Detail Job : there's an request error in total ${errors.length}, retrying ...`)

    }

    jobs = jobs.map(job => job.data.data.jobDetail)
    return jobs
}

const scrapeJobs = async () => {
    let jobsId = []
    let numPage = 1
    
    while(true){
        const response = await request(APISchema.getJobSchema(numPage) )
        if( response.errors.status ){
            console.log(`[WARNING] Jobstreet - Main Scraping : failed to fetch jobs catalogue in page ${numPage}, retrying ...`)
            continue
        }

        try{
            const jobs = response.data.data.jobs.jobs
            const totalNumberOfJobs = jobs.length
            for(job of jobs){
                jobsId.push(job.id)
            }

            if( totalNumberOfJobs < 1) break
            console.log(`[INFO] Jobstreet - Main Scraping : found ${totalNumberOfJobs} jobs in page ${numPage}`)
            numPage++
        }catch{
            numPage++
        }
    
    }

    return jobsId

}

const filterJobCategory = async (jobCategory, categoryMap) => {
    if( jobCategory.length < 1 || !jobCategory instanceof Array ) return false
    if( !categoryMap ) return false
    
    jobCategory = jobCategory.map(category => category.code)
    for( let category of jobCategory ){
        category = String(category)
        if( categoryMap.has(category) ) return categoryMap.get(category)
    }
    
    return false
 }

 const filterJobLocation = async(jobLocation, locationMap) => {
    if( jobLocation.length < 1 || !jobLocation instanceof Array ) return false
    if( !locationMap) return false
    
    jobLocation = jobLocation.map(location => location.locationId)
    for( location of jobLocation ){
        location = String(location)
        if( locationMap.has(location) ) return locationMap.get(location)
    }

    return false
 }


const filterJobs = async (jobs) => {
    console.log(`[INFO] Jobstreet - Job Filtering: filtering job catalogue ...`)

    let filteredJobs = []
    let categoryMap = await JobMap.category()
        categoryMap = categoryMap.jobstreet
    let locationMap = await JobMap.location()
        locationMap = locationMap.jobstreet
    let jobType = new Map()

    jobType.set('Penuh Waktu', 'full time')
    jobType.set('Paruh Waktu', 'part time')
    jobType.set('Kontrak', 'contractual')
    jobType.set('Temporer', 'freelance')

    for( job of jobs ){
        try{
            let { pageUrl, header, companyDetail, jobDetail, location } = job
            let { salary, logoUrls, jobTitle, company } = header
            let { companyOverview, companyWebsite } = companyDetail
            let { jobDescription, jobRequirement } = jobDetail

            let isVocational =  jobRequirement.qualification.toUpperCase().search('SMA') > -1 ||
                                jobRequirement.qualification.toUpperCase().search('SMK') > -1 ||
                                jobRequirement.qualification.toUpperCase().search('SMU') > -1 ||
                                jobDescription.html.toUpperCase().search('SMA') > -1 ||
                                jobDescription.html.toUpperCase().search('SMK') > -1 ||
                                jobDescription.html.toUpperCase().search('SMU') > -1

             let jobCatalogue = jobsController.jobCatalogueSchema({
                title: jobTitle,
                type: jobType.get(jobRequirement.employmentType) || null,
                salary: {
                    min: Number.parseInt(salary.min),
                    max: Number.parseInt(salary.max),
                    type: salary.type,
                    currency: salary.currency
                },
                qualification: jobRequirement.qualification,
                description: jobDescription.html,
                job_source: 'jobstreet',
                job_url: pageUrl,
                company:{
                    name: company.name,
                    description: companyOverview.html,
                    website: companyWebsite,
                    logo: logoUrls.normal
                },
                is_vocational: isVocational,
                category: await filterJobCategory(jobRequirement.jobFunctionValue, categoryMap) || null,
                location: await filterJobLocation(location, locationMap) || null,
                tags: jobRequirement.jobFunctionValue.map(tag => tag.name),
                posted_date: moment(header.postedAt).toISOString(),
                expired_date: moment(jobRequirement.closingDate).toISOString(),
            })
            
            filteredJobs.push(jobCatalogue)

        }catch(exception){
            console.log(`[WARNING] Jobstreet - Job Filtering : ${exception.message}`)
        }
    }

    return filteredJobs
}


exports.getJobs = async () => {
    const jobsId = await scrapeJobs()
    const jobs = await scrapeJobDetails(jobsId)
    const filteredJobs = await filterJobs(jobs)
    try{
        console.log(`[INFO] Jobstreet - Database Insert : Inserting ${filteredJobs.length} jobs to database`)
        const jobCatalogueModel = await mongoDB.model('job_catalogue')
        await jobCatalogueModel.deleteMany({job_source: 'jobstreet'})
        await jobCatalogueModel.insertMany(filteredJobs)
        console.log(`[INFO] Jobstreet scraping successfuly`)
    }catch(exception){
        console.log(`[ERROR] Jobstreet - Insert Database : there's an error inserting data to databse. ${exception.message}`)
    }

    console.log(`[INFO] Jobstreet Scraping Done ...`)
}
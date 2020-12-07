const request = require('../helper/Request')
const mongoDB = require('../models/mongo')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const jobsController = require('../controllers/Jobs')
const APISchema = require('./JobStreetAPISchema')
const fs = require('fs')

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

const jobCategoryMap = async () => {
    let jobCategoryModel = await mongoDB.model('job_category')
    let jobCategory = await jobCategoryModel.find({})
        jobCategory = jobCategory.map(category => new Object({code: category.search_id.jobstreet, categoryId: category._id}))
    
    let jobCategoryMap = new Map()
    for( let category of jobCategory ){
        for( let code of category.code  ){
            jobCategoryMap.set(code, ObjectId(category.categoryId))
        }
    }

    return jobCategoryMap
}

const jobLocationMap = async () => {
    let jobLocationModel = await mongoDB.model('job_location')
    let jobLocation = await jobLocationModel.find({})
        jobLocation = jobLocation.map(location => new Object({code: location.search_id.jobstreet, id: location._id}))
    let locationMap = new Map()
    for( let location of jobLocation ){
        locationMap.set(location.code, ObjectId(location.id))
    }
    return locationMap
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
    let categoryMap = await jobCategoryMap()
    let locationMap = await jobLocationMap()

    for( job of jobs ){
        try{
            let jobCatalogue = jobsController.jobCatalogueSchema()
            let { pageUrl, header, companyDetail, jobDetail, location } = job
            let { salary, logoUrls, jobTitle, company } = header
            let { companyOverview, companyWebsite } = companyDetail
            let { jobDescription, jobRequirement } = jobDetail
            
            jobCatalogue.title = jobTitle
            jobCatalogue.type = jobRequirement.employmentType
            jobCatalogue.salary.min = Number.parseInt(salary.min)
            jobCatalogue.salary.max = Number.parseInt(salary.max)
            jobCatalogue.salary.type = salary.type
            jobCatalogue.salary.currency = salary.currency
            jobCatalogue.qualification = jobRequirement.qualification
            jobCatalogue.description = jobDescription.html
            jobCatalogue.job_source = 'jobstreet'
            jobCatalogue.job_url = pageUrl
            jobCatalogue.company.name = company.name
            jobCatalogue.company.description = companyOverview.html
            jobCatalogue.company.website = companyWebsite
            jobCatalogue.company.logo = logoUrls.normal

            let isVocational =  jobCatalogue.qualification.toUpperCase().search('SMA') > -1 ||
                                jobCatalogue.qualification.toUpperCase().search('SMK') > -1 ||
                                jobCatalogue.qualification.toUpperCase().search('SMU') > -1 ||
                                jobCatalogue.description.toUpperCase().search('SMA') > -1 ||
                                jobCatalogue.description.toUpperCase().search('SMK') > -1 ||
                                jobCatalogue.description.toUpperCase().search('SMU') > -1
            
            jobCatalogue.is_vocational = isVocational
            jobCatalogue.category = await filterJobCategory(jobRequirement.jobFunctionValue, categoryMap) || null
            jobCatalogue.location = await filterJobLocation(location, locationMap) || null
            filteredJobs.push(jobCatalogue)

        }catch(exception){
            console.log(`[WARNING] Jobstreet - Job Filtering : ${exception.message}`)
        }
    }

    return filteredJobs
}


exports.getJobs = async () => {
    const jobsCatalogue = await JSON.parse(await fs.readFileSync('jobs.json'))
    const jobsId = await scrapeJobs()
    const jobs = await scrapeJobDetails(jobsId)
    const filteredJobs = await filterJobs(jobs)
    try{
        const jobCatalogueModel = await mongoDB.model('job_catalogue')
        await jobCatalogueModel.insertMany(jobsCatalogue)
    }catch(exception){
        console.log(`[ERROR] Jobstreet - Insert Database : there's an error inserting data to databse. ${exception.message}`)
    }
}
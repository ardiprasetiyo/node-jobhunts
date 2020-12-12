const request = require('../helper/Request')
const APISchema = require('./APISchema/GlintsAPISchema')
const JobsController = require('../controllers/Jobs')
const mongoDB = require('../models/Mongo')
const JobMap = require('../helper/JobMap')
const moment = require('moment')
const fs = require('fs')

const scrapeJobs = async () => {
    console.log(`[INFO] Glints - Main Scraping : Scraping glints job catalogue`)

    let jobs = []
    let numPage = 1
    while(true){
        const response = await request(APISchema.getJobSchema({page: numPage})) 
        if( response.errors.status ){
            console.log(`[WARNING] Glints - Main Scraping : There's an error while scraping data on page ${numPage}. ${response.errors.reason}`)
            continue
        }
        let jobsData = response.data.data
        let numberOfJobs = jobsData.length
        console.log(`[INFO] Glints - Main Scraping : ${numberOfJobs} Jobs found in page ${numPage}`)
        if( numberOfJobs < 1 ) break
        for( job of jobsData ){
            jobs.push(job)
        }
        numPage++
    }

    return jobs
}

const filterDescription = (descriptionRaw) => {
    if( !descriptionRaw || typeof descriptionRaw != 'object' ) return false
    let parsedDescription = ''
    for( let description of descriptionRaw ){
        parsedDescription += `${description.text} <br>`
    }
    return parsedDescription
}

const filterUrl = (jobTitle, jobId) => {
    if( !jobTitle || !jobId ) return false
    jobTitle = jobTitle.replace(/\s+/g, '-').toLowerCase()

    let parsedUrl = `https://glints.com/id/opportunities/jobs/${jobTitle}/${jobId}`
    return parsedUrl
} 

const filterCompanyLogoUrl = (logoUrl) => {
    if( !logoUrl ) return false
    return `https://images.glints.com/unsafe/160x0/glints-dashboard.s3.amazonaws.com/company-logo/${logoUrl}`
}

const filterJobType = (jobType) => {
    if( !jobType ) return false
    return jobType.replace(/_/g, " ").toLowerCase()
}

const filterIsVocational = (jobDescription) => {
    let isVocational = false
    if( jobDescription ){
        isVocational = !(jobDescription.toUpperCase().search('S1') > -1 ||
                         jobDescription.toUpperCase().search('DIPLOMA') > -1 ||
                         jobDescription.toUpperCase().search('D1') > -1 ||
                         jobDescription.toUpperCase().search('D2') > -1 ||
                         jobDescription.toUpperCase().search('D3') > -1 ||
                         jobDescription.toUpperCase().search('D4') > -1 ||
                         jobDescription.toUpperCase().search('BACHELOR') > -1)
    }

    return isVocational
}

const filterJobs = async (jobs) => {
    console.log(`[INFO] Glints - Filtering : Filtering jobs catalogue`)

    let filteredJobs = []
    let categoryMap = await JobMap.category()
        categoryMap = categoryMap.glints
    let locationMap = await JobMap.location()
        locationMap = locationMap.glints

    for( job of jobs ){
        const jobTitle = job.title
        const jobType = filterJobType(job.type) || null
        const jobDescription = filterDescription(job.descriptionRaw.blocks) || null
        const jobCategory    = categoryMap.has(String(job.links.jobCategory.id)) ? 
                               categoryMap.get(String(job.links.jobCategory.id)) : null
        let isVocational     = filterIsVocational(jobDescription)
        const salaryMin  = job.links.jobSalaries.length > 0 ? 
                           job.links.jobSalaries[0].minAmount : null
        const salaryMax  = job.links.jobSalaries.length > 0 ? 
                           job.links.jobSalaries[0].maxAmount : null
        const salaryType = job.links.jobSalaries.length > 0 ? 
                           job.links.jobSalaries[0].salaryMode.toLowerCase() + 'ly' : null
        const salaryCurrency = job.links.jobSalaries.length > 0 ? 
                               job.links.jobSalaries[0].CurrencyCode : null

        const jobUrl = filterUrl(job.title, job.id) || null
        
        const companyName = job.links.company.name
        const companyDescription = job.links.company.descriptionRaw ? 
                                   filterDescription( job.links.company.descriptionRaw.blocks ) : null
        const companyWebsite = job.links.company.website || null
        const companyLogo = filterCompanyLogoUrl(job.links.company.logo) || null

        const jobTags = job.links.jobCategory.name != 'Other' ? [job.links.jobCategory.name] : null
        const jobLocation = locationMap.has(String(job.links.city.id)) ? 
                                locationMap.get(String(job.links.city.id)) : null

        let formattedJob = JobsController.jobCatalogueSchema({
            title: jobTitle,
            type: jobType,
            category: jobCategory,
            is_vocational: isVocational,
            salary:{
                min: salaryMin,
                max: salaryMax,
                type: salaryType,
                currency: salaryCurrency
            },
            qualification: null,
            description: jobDescription,
            job_source: 'glints',
            job_url: jobUrl,
            company: {
                name: companyName,
                description: companyDescription,
                website: companyWebsite,
                logo: companyLogo,
            },
            tags: jobTags,
            location: jobLocation,
            posted_date: moment(job.createdAt).toISOString(),
            expired_date: moment(job.expiryDate).toISOString()
        })

        filteredJobs.push(formattedJob)
    }

    return filteredJobs

}

exports.getJobs = async () => {
    const jobs = await scrapeJobs()
    const filteredJobs = await filterJobs(jobs)
    try{
        console.log(`[INFO] Glints - Database Insert : Inserting ${filteredJobs.length} jobs to database`)
        const jobCatalogueModel = await mongoDB.model('job_catalogue')
        await jobCatalogueModel.deleteMany({job_source: 'glints'})
        await jobCatalogueModel.insertMany(filteredJobs)
        console.log(`[INFO] Glints Scraping Successfuly`)
    }catch(exception){
        console.log(`[ERROR] Glints - Database Insert : There's an error while inserting data to database ${exception.message}`)
    }
}
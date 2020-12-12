const APISchema = require('../scraper/KalibrrAPISchema')
const JobsController = require('../controllers/Jobs')
const request = require('../helper/Request')
const mongoDB = require('../models/Mongo')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const fs = require('fs')
const moment = require('moment')

const jobCategoryMap = async () => {
    let jobCategoryModel = await mongoDB.model('job_category')
    let jobCategory = await jobCategoryModel.find({})
        jobCategory = jobCategory.map(category => new Object({code: category.search_id.kalibrr, id: category._id}))
    let categoryMap = new Map()
    for( let category of jobCategory ){
        for( let code of category.code ){
            categoryMap.set(code, ObjectId(category.id))
        }
    }
    return categoryMap
}

const jobLocationFilter = async (currentJobLocation, jobLocation) => {
    for( let location of jobLocation ){
        if( currentJobLocation.toLowerCase().search(location.code.toLowerCase()) > -1 ) return location.id
    }

    return null
}

const filterJobs = async(jobs) => {
    console.log(`[INFO] Kalibrr - Jobs Filtering : Filtering Jobs ...`)
     
    // Filtered Code for Vocational 
    const isVocationalCode = [150, 200, 300, 350]
    const categoryMap = await jobCategoryMap()

    // Fetch locations from database
    jobLocationModel = await mongoDB.model('job_location')
    let jobLocation = await jobLocationModel.find({})
        jobLocation = jobLocation.map(location => new Object({code: location.search_id.kalibrr, id: location._id}))

    let filteredJobs = []

    for( let job of jobs ){
        const formattedJob = JobsController.jobCatalogueSchema({
            title: job.name,
            type: job.tenure.toLowerCase(),
            category: categoryMap.has(job.function) ? categoryMap.get(job.function) : null,
            is_vocational: isVocationalCode.includes(job.education_level),
            salary:{
                min: job.base_salary,
                max: job.maximum_salary,
                type: job.salary_interval,
                currency: job.salary_currency
            },
            qualification: job.qualifications,
            description: job.description,
            job_source: 'kalibrr',
            job_url: `https://kalibrr.id/c/${job.company.code}/jobs/${job.id}/${job.slug}`,
            company: {
                name: job.company_info.name,
                description: job.company_info.description,
                website: job.company_info.url,
                logo: job.company_info.logo,
            },
            tags: job.job_sds_skills.map(tag => tag.sds_skill.name),
            location: await jobLocationFilter(job.google_location.address_components.city, jobLocation),
            posted_date: moment(job.activation_date).toISOString(),
            expired_date: moment(job.application_end_date).toISOString()
        })
        filteredJobs.push(formattedJob)
    }
    
    return filteredJobs
}

const scrapeJobs = async () => {
    let jobCatalogue = []
    let numPage = 1

    while( true ){
        const response = await request(APISchema.getJobSchema({page: numPage}))
        if( response.errors.status ){
            console.log(`[WARNING] Kalibrr - Main Scraping : failed to fetch jobs catalogue in page ${numPage}, retrying ...`)
            continue
        }

        try{
            const jobs = response.data.jobs
            const totalNumberOfJobs = jobs.length
            for( job of jobs ){
                jobCatalogue.push(job)
            }
            if( totalNumberOfJobs < 1 ) break
            console.log(`[INFO] Kalibrr - Main Scraping : found ${totalNumberOfJobs} jobs in page ${numPage}`)

            numPage++
        }catch(exception){
            numPage++
        }
    }

    return jobCatalogue
}

exports.getJobs = async() => {
    const jobs = await scrapeJobs()
    const filteredJobs = await filterJobs(jobs)
    
    console.log(`[INFO] Kalibrr - Database : Inserting data into Database ...`)
    try{
        const jobCatalogueModel = await mongoDB.model('job_catalogue')
        await jobCatalogueModel.deleteMany({job_source: 'kalibrr'})
        await jobCatalogueModel.insertMany(filteredJobs)
    }catch(exception){
        console.log(`[ERROR] Kalibrr - Database : there's an error inserting data to databse. ${exception.message}`)
    }

    console.log(`[INFO] Kalibrr Scraping Done ...`)
}
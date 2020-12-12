const http = require('http')
const https = require('https')
const axios = require('axios')

const request = async ({...args}) => {
    const resultObject = {
        errors: {
            status: false,
            reason: null,
            request_config: null
        },
        data: null
    }

    if(!args.requestUrl) {
        resultObject.errors.status = true
        resultObject.errors.reason = 'Request URL must be provided' 
        return resultObject
    }

    if(!args.requestMethod){
        resultObject.errors.status = true
        resultObject.errors.reason = 'Request method must be provided'
        return resultObject
    }

    const requestUrl = args.requestUrl
    const requestMethod = args.requestMethod
    const requestHeaders = {
        'Content-Type': 'application/json'
    }
    const requestBody = args.requestBody || {}
    
    try{
        const response = await axios({
            url: requestUrl,
            method: requestMethod,
            data: requestBody,
            headers: requestHeaders,
            httpAgent: http.Agent({keepAlive: true}),
            httpsAgent: https.Agent({keepAlive: true})
        })
        if( !response.data ){
            resultObject.errors.status = true;
            resultObject.errors.reason = 'No response'
            return resultObject
        }

        // Jobstreet Scrapper Verbose
        if( response.data ){
            if( response.data.data ){
                if( response.data.data.jobDetail ){
                    console.log(`[INFO] Jobstreet : found a job, ${response.data.data.jobDetail.header.jobTitle}`)
                }
            }
        }

        resultObject.data = response.data
        return resultObject
    }catch(exception){
        resultObject.errors.status = true;
        resultObject.errors.reason = exception.message

        if( exception.hasOwnProperty('toJSON') ){
            let exceptJSON = exception.toJSON()
        
            resultObject.errors.request_config = {
                url: exceptJSON.config.url,
                method: exceptJSON.config.method,
                data: exceptJSON.config.data,
                headers: exceptJSON.config.headers
            }
        }

        return resultObject
    }
}

module.exports = request
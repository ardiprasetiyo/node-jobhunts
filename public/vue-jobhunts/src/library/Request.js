import Axios from 'axios'

const Request = async ({...args}) => {
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
        'Content-Type': 'application/json',
    }

    if( args.requestHeaders ){
        const customHeaders = args.requestHeaders
        for( let headerKey of Object.keys(customHeaders) ){
            let headerValue = customHeaders[headerKey]
            requestHeaders[headerKey] = headerValue
        }
    }

    const requestBody = args.requestBody || null
    
    try{
        const response = await Axios({
            url: requestUrl,
            method: requestMethod,
            data: requestBody,
            headers: requestHeaders
        })
        if( !response.data ){
            resultObject.errors.status = true;
            resultObject.errors.reason = 'No response'
            return resultObject
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


export default{
    Request
}
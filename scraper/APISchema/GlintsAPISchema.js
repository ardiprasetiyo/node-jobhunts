exports.getJobSchema = ({...args}) => {
    let page = args.page || 1
    page = page-1
    const limit = 100
    const offset = page * limit
    let searchTerm = `?type[]=INTERNSHIP&type[]=FULL_TIME&type[]=PART_TIME&type[]=PROJECT_BASED&CountryCode[]=ID&sortBy=latest&SearchTerm=Bandung&limit=${limit}&offset=${offset}`
    return {
        requestMethod: 'GET',
        requestUrl: `https://glints.com/api/marketplace/jobs${searchTerm}`,
    }
}
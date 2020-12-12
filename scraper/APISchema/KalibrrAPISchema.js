exports.getJobSchema = ({...args}) => {

    let locations = ['Bandung']
        locations = locations.map(location => location.replace(' ', '+'))
                             .map(location => `location=${location}&`)

    if( typeof args.page != 'number' ) return false
    let page = args.page || 1
    page = page - 1
    const limit = 100
    const offset = page * limit

    return new Object({
        requestUrl: `https://www.kalibrr.id/kjs/job_board/search?education_level=100&education_level=150&education_level=200&education_level=300&education_level=350&education_level=400&education_level=450&education_level=500&education_level=550&education_level=600&education_level=650&education_level=700&education_level=750&function=Accounting+and+Finance&function=Administration+and+Coordination&function=Architecture+and+Engineering&function=Arts+and+Sports&function=Customer+Service&function=Education+and+Training&function=General+Services&function=Health+and+Medical&function=Hospitality+and+Tourism&function=Human+Resources&function=IT+and+Software&function=Legal&function=Management+and+Consultancy&function=Manufacturing+and+Production&function=Media+and+Creatives&function=Public+Service+and+NGOs&function=Safety+and+Security&function=Sales+and+Marketing&function=Sciences&function=Supply+Chain&function=Writing+and+Content&limit=${limit}&${locations.join('')}offset=${offset}&tenure=Contractual&tenure=Freelance&tenure=Full+time&tenure=Part+time&work_experience=100&work_experience=200&work_experience=300&work_experience=400&work_experience=500`,
        requestMethod: 'GET'
    })
}
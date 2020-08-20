const { constructUrl } = require('../utils/utils')
const { usersUrl, userByIdUrl, usersByCity } = require('../config/config').services.swaggerApi

class SwaggerCitizenAdaptor {
    constructor(axios) {
        this.axios = axios
    }

    getAll = async () => {
        let response = await this.axios({method: 'get', url: usersUrl})
        return response.data
    }
    
    getById = async (id) => {
        let prefixUrl = userByIdUrl
        let response = await this.axios({method: 'get', url: prefixUrl + id})
        return response.data
    }
    
    getAllByCity = async (city) => {
        let url = constructUrl(city, usersByCity, '{city}')
        let response = await this.axios({method: 'get', url: url})
        return response.data
    }
    
    getAllCitizensOutsideOfCity = async (citizensInCity) => {
        let allCitizens = await this.getAll()
        let citizensInCityIDs = citizensInCity.map(cit => cit.id)
        return allCitizens.filter(cit => !citizensInCityIDs.includes(cit.id))
    }
}

module.exports = {SwaggerCitizenAdaptor}
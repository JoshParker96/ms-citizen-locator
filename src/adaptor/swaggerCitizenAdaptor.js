const axios = require('axios')

const { constructUrl } = require('../utils/utils')
const { usersUrl, userByIdUrl, usersByCity } = require('../config/config').services.swaggerApi

let getAll = async () => {
    let response = await axios({method: 'get', url: usersUrl})
    return response.data
}

let getById = async (id) => {
    let prefixUrl = userByIdUrl
    let response = await axios({method: 'get', url: prefixUrl + id})
    return response.data
}

let getAllByCity = async (city) => {
    let url = constructUrl(city, usersByCity, '{city}')
    let response = await axios({method: 'get', url: url})
    return response.data
}

let getAllCitizensOutsideOfCity = async (citizensInCity) => {
    let allCitizens = await getAll()
    let citizensInCityIDs = citizensInCity.map(cit => cit.id)
    return allCitizens.filter(cit => !citizensInCityIDs.includes(cit.id))
}

module.exports = {
    getAll,
    getById,
    getAllByCity,
    getAllCitizensOutsideOfCity
}
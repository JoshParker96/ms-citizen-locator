const axios = require('axios')

const { constructUrl } = require('../utils/utils')
const { getAllCitizensUrl, getCitizenByIdUrl, getCitizensByCityUrl } = require('../config/config')

let getAll = async () => {
    let response = await axios({method: 'get', url: getAllCitizensUrl})
    return response.data
}

let getById = async (id) => {
    let prefixUrl = getCitizenByIdUrl
    let response = await axios({method: 'get', url: prefixUrl + id})
    return response.data
}

let getAllByCity = async (city) => {
    let url = constructUrl(city, getCitizensByCityUrl, '{city}')
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
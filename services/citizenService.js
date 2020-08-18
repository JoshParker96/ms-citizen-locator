const axios = require('axios')

const { constructUrl } = require('../utils/utils')
const { getAllCitizensWithinRadiusOfLocation } = require('../analyser/coordinateAnalyser')
const { getAllCitizensUrl, getCitizensByCityUrl, cityCoordinatesUrl } = require('../config/config')

let getAllCitizens = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCitizens = await getAll()
            resolve(allCitizens)
        } catch (err) {
            reject(err)
        }
    })
}

let getAllCitizensInAndWithinRadiusOfCity = async (city, radius) => {
    let noCitizensInCityMessage = `Unable to find any citizens in city ${city}`
    return new Promise(async (resolve, reject) => {
        try {
            let citizensInCity = await getAllByCity(city)
            if (!citizensInCity.length) {
                reject(noCitizensInCityMessage)
            }
            let allCitizensOutsideOfCity = await getAllCitizensOutsideOfCity(citizensInCity)
            let cityLocation = await getCoordinatesForCity(city)
            let citizensOutsideOfCityWithinRadius = 
                getAllCitizensWithinRadiusOfLocation(allCitizensOutsideOfCity, cityLocation, radius)
            let citizensInAndAroundSpecifiedRadius =
                getCitizensInAndAroundSpecifiedRadius(citizensInCity, citizensOutsideOfCityWithinRadius)
            resolve(citizensInAndAroundSpecifiedRadius)
        } catch (err) {
            reject(err)
        }
    })
}

let getAll = async () => {
    let response = await axios({method: 'get', url: getAllCitizensUrl})
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

let getCoordinatesForCity = async (city) => {
    let url = constructUrl(city, cityCoordinatesUrl, '{city}')
    let response = await axios({method: 'get', url: url})
    return { latitude: response.data.latt, longitude: response.data.longt }
}

let getCitizensInAndAroundSpecifiedRadius = (citizensInCity, citizensOutsideOfCityWithinRadius) => {
    return citizensInCity.concat(citizensOutsideOfCityWithinRadius)
}

module.exports = {
    getAllCitizens,
    getAllCitizensInAndWithinRadiusOfCity
}

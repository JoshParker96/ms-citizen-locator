const axios = require('axios')

const { getAllCitizensWithinRadiusOfLocation } = require('../analyser/coordinateAnalyser')
const { getAllCitizensUrl, getCitizensByCityUrl, cityCoordinatesUrl } = require('../config/config')

let getAllCitizens = () => {
    return new Promise((resolve, reject) => {
        getAll().then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

let getAllCitizensWithInRadiusOfCity = async (city, radius) => {
    return new Promise((resolve, reject) => {
        getAllByCity(city)
        .then(async (citizensInCity) => {
            let allCitizensOutsideOfCity = await getAllCitizensOutsideOfCity(citizensInCity)
            let cityLocation = await getCoordinatesForCity(city)
            let citizensOutsideOfCityWithinRadius = 
                getAllCitizensWithinRadiusOfLocation(allCitizensOutsideOfCity, cityLocation, radius)
            let citizensInAndAroundSpecifiedRadius =
                getCitizensInAndAroundSpecifiedRadius(citizensInCity, citizensOutsideOfCityWithinRadius)
            resolve(citizensInAndAroundSpecifiedRadius)
        })
    })
}

let getAll = async () => {
    let response = await axios({method: 'get', url: getAllCitizensUrl})
    return response.data
}

let getAllByCity = async (city) => {
    let capitalisedCity = city.charAt(0).toUpperCase() + city.slice(1)
    let url = getCitizensByCityUrl.replace('{city}', capitalisedCity)
    let response = await axios({method: 'get', url: url})
    return response.data
}

let getAllCitizensOutsideOfCity = async (citizensInCity) => {
    let allCitizens = await getAll()
    let citizensInCityIDs = citizensInCity.map(cit => cit.id)
    return allCitizens.filter(cit => !citizensInCityIDs.includes(cit.id))
}

let getCoordinatesForCity = async (city) => {
    let capitalisedCity = city.charAt(0).toUpperCase() + city.slice(1)
    let url = cityCoordinatesUrl.replace('{city}', capitalisedCity)
    let response = await axios({method: 'get', url: url})
    return {latitude: response.data.latt, longitude: response.data.longt}
}

let getCitizensInAndAroundSpecifiedRadius = (citizensInCity, citizensOutsideOfCityWithinRadius) => {
    return citizensInCity.concat(citizensOutsideOfCityWithinRadius)
}

module.exports = {
    getAllCitizens,
    getAllCitizensWithInRadiusOfCity
}

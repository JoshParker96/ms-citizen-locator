const coordinateAnalyser = require('../analyser/coordinateAnalyser')
const swaggerCitizenAdaptor = require('../adaptor/swaggerCitizenAdaptor')
const geoCodeCoordinateAdaptor = require('../adaptor/geoCodeCoordinateAdaptor')
const NOT_FOUND = 404

let getAllCitizens = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCitizens = await swaggerCitizenAdaptor.getAll()
            resolve(allCitizens)
        } catch (err) {
            reject(err)
        }
    })
}

let getCitizenById = (id) => {
    let noCitizenFoundMessage = 'no citizen was found'
    return new Promise(async (resolve, reject) => {
        try {
            let citizen = await swaggerCitizenAdaptor.getById(id)
            resolve(citizen)
        } catch (err) {
            if (citizenIsNotFound(err)) {
                reject(noCitizenFoundMessage)
            }
            reject(err)
        }
    })
}

let getAllCitizensByCity = (city) => {
    let noCitizensInCityMessage = `Unable to find any citizens in city ${city}`
    return new Promise(async (resolve, reject) => {
        try {
            let allCitizensByCity = await swaggerCitizenAdaptor.getAllByCity(city)
            if (!allCitizensByCity.length) {
                reject(noCitizensInCityMessage)
            }
            resolve(allCitizensByCity)
        } catch (err) {
            reject(err)
        }
    })
}

let getAllCitizensInAndWithinRadiusOfCity = async (city, radius) => {
    let noCitizensInCityMessage = `Unable to find any citizens in city ${city}`
    return new Promise(async (resolve, reject) => {
        try {
            let citizensInCity = await swaggerCitizenAdaptor.getAllByCity(city)
            if (!citizensInCity.length) {
                reject(noCitizensInCityMessage)
            }
            let allCitizensOutsideOfCity = await swaggerCitizenAdaptor.getAllCitizensOutsideOfCity(citizensInCity)
            let cityLocation = await geoCodeCoordinateAdaptor.getCoordinatesForCity(city)
            let citizensOutsideOfCityWithinRadius = 
                coordinateAnalyser.getAllCitizensWithinRadiusOfLocation(allCitizensOutsideOfCity, cityLocation, radius)
            let citizensInAndAroundSpecifiedRadius =
                joinLists(citizensInCity, citizensOutsideOfCityWithinRadius)
            resolve(citizensInAndAroundSpecifiedRadius)
        } catch (err) {
            reject(err)
        }
    })
}

let citizenIsNotFound = (err) => {
    return err.response.status == NOT_FOUND
}

let joinLists = (citizensInCity, citizensOutsideOfCityWithinRadius) => {
    return citizensInCity.concat(citizensOutsideOfCityWithinRadius)
}

module.exports = {
    getAllCitizens,
    getCitizenById,
    getAllCitizensByCity,
    getAllCitizensInAndWithinRadiusOfCity
}

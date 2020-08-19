const coordinateAnalyser = require('../analyser/coordinateAnalyser')
const swaggerCitizenAdaptor = require('../adaptor/swaggerCitizenAdaptor')
const geoCodeCoordinateAdaptor = require('../adaptor/geoCodeCoordinateAdaptor')
const { Http500Error, Http404NotFoundError, HttpStatusCodes } = require('../error/errors')

let getAllCitizens = async () => {
    try {
        return await swaggerCitizenAdaptor.getAll()
    } catch (err) {
        throw new Http500Error('Internal server error message')
    }
}

let getCitizenById = async (id) => {
    try {
        let citizen = await swaggerCitizenAdaptor.getById(id)
        return citizen
    } catch (err) {
        if (isHttp404NotFoundResponse(err)) {
            throw new Http404NotFoundError('Citizen not found')
        }
        throw new Http500Error('Internal server error')
    }
}

let getAllCitizensByCity = async (city) => {
    try {
        let allCitizensByCity = await swaggerCitizenAdaptor.getAllByCity(city)
        if (!allCitizensByCity.length) {
            throw new Http404NotFoundError(`Unable to find any citizens in city '${city}'`)
        }
        return allCitizensByCity
    } catch (err) {
        if (err instanceof Http404NotFoundError) throw err
        throw new Http500Error('Internal server error')
    }
}

let getAllCitizensInAndWithinRadiusOfCity = async (city, radius) => {
    try {
        let citizensInCity = await swaggerCitizenAdaptor.getAllByCity(city)
        if (!citizensInCity.length) {
            throw new Http404NotFoundError(`Unable to find any citizens in city '${city}'`)
        }
        let allCitizensOutsideOfCity = await swaggerCitizenAdaptor.getAllCitizensOutsideOfCity(citizensInCity)
        let cityLocation = await geoCodeCoordinateAdaptor.getCoordinatesForCity(city)

        let citizensOutsideOfCityWithinRadius = 
            coordinateAnalyser.getAllCitizensWithinRadiusOfLocation(allCitizensOutsideOfCity, cityLocation, radius)
            
        let citizensInAndAroundRadiusOfCity = joinLists(citizensInCity, citizensOutsideOfCityWithinRadius)
        return citizensInAndAroundRadiusOfCity
    } catch (err) {
        if (err instanceof Http404NotFoundError) {
            throw err
        }
        throw new Http500Error('Internal server error')
    }
}

let isHttp404NotFoundResponse = (err) => {
    return err.response.status == HttpStatusCodes.NOT_FOUND
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

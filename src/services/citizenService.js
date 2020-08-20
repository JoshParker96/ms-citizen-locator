const { Http500Error, Http404NotFoundError, HttpStatusCodes } = require('../error/errors')

class CitizenService {
    constructor(swaggerCitizenAdaptor, geoCodeCoordinateAdaptor, coordinateAnalyser) {
        this.swaggerCitizenAdaptor = swaggerCitizenAdaptor
        this.geoCodeCoordinateAdaptor = geoCodeCoordinateAdaptor
        this.coordinateAnalyser = coordinateAnalyser
    }
    getAllCitizens = async () => {
        try {
            return await this.swaggerCitizenAdaptor.getAll()
        } catch (err) {
            throw new Http500Error('Internal server error message')
        }
    }
    
    getCitizenById = async (id) => {
        try {
            return await this.swaggerCitizenAdaptor.getById(id)
        } catch (err) {
            if (this.isHttp404NotFoundResponse(err)) {
                throw new Http404NotFoundError('Citizen not found')
            }
            throw new Http500Error('Internal server error')
        }
    }
    
    getAllCitizensByCity = async (city) => {
        try {
            let allCitizensByCity = await this.swaggerCitizenAdaptor.getAllByCity(city)
            if (!allCitizensByCity.length) {
                throw new Http404NotFoundError(`Unable to find any citizens in city '${city}'`)
            }
            return allCitizensByCity
        } catch (err) {
            if (err instanceof Http404NotFoundError) throw err
            throw new Http500Error('Internal server error')
        }
    }
    
    getAllCitizensInAndWithinRadiusOfCity = async (city, radius) => {
        try {
            let citizensInCity = await this.swaggerCitizenAdaptor.getAllByCity(city)
            if (!citizensInCity.length) {
                throw new Http404NotFoundError(`Unable to find any citizens in city '${city}'`)
            }
            let allCitizensOutsideOfCity = await this.swaggerCitizenAdaptor.getAllCitizensOutsideOfCity(citizensInCity)
            let cityLocation = await this.geoCodeCoordinateAdaptor.getCoordinatesForCity(city)
    
            let citizensOutsideOfCityWithinRadius = 
                this.coordinateAnalyser.getAllCitizensWithinRadiusOfLocation(allCitizensOutsideOfCity, cityLocation, radius)
                
            let citizensInAndAroundRadiusOfCity = this.joinLists(citizensInCity, citizensOutsideOfCityWithinRadius)
            return citizensInAndAroundRadiusOfCity
        } catch (err) {
            if (err instanceof Http404NotFoundError) {
                throw err
            }
            throw new Http500Error('Internal server error')
        }
    }
    
    isHttp404NotFoundResponse = async (err) =>  {
        return err.response.status == HttpStatusCodes.NOT_FOUND
    }
    
    joinLists = async (citizensInCity, citizensOutsideOfCityWithinRadius) => {
        return citizensInCity.concat(citizensOutsideOfCityWithinRadius)
    }
}

module.exports = { CitizenService }

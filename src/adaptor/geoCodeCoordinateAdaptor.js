const { constructUrl } = require('../utils/utils')
const { coordinatesByCityUrl } = require('../config/config').services.geocodeApi

class GeoCodeCoordinateAdaptor {
    constructor(axios) {
        this.axios = axios
    }
    getCoordinatesForCity = async (city) => {
        let url = constructUrl(city, coordinatesByCityUrl, '{city}')
        let response = await this.axios({method: 'get', url: url})
        return { latitude: response.data.latt, longitude: response.data.longt }
    }
}

module.exports = { GeoCodeCoordinateAdaptor }
const axios = require('axios')

const { constructUrl } = require('../utils/utils')
const { coordinatesByCityUrl } = require('../config/config').services.geocodeApi

let getCoordinatesForCity = async (city) => {
    let url = constructUrl(city, coordinatesByCityUrl, '{city}')
    let response = await axios({method: 'get', url: url})
    return { latitude: response.data.latt, longitude: response.data.longt }
}

module.exports = { getCoordinatesForCity }
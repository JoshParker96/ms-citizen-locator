const axios = require('axios')

const { constructUrl } = require('../utils/utils')
const { cityCoordinatesUrl } = require('../config/config')

let getCoordinatesForCity = async (city) => {
    let url = constructUrl(city, cityCoordinatesUrl, '{city}')
    let response = await axios({method: 'get', url: url})
    return { latitude: response.data.latt, longitude: response.data.longt }
}

module.exports = { getCoordinatesForCity }
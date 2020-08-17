const axios = require('axios')

const { getAllCitizensUrl } = require('../config/config')

let getAllCitizens = () => {
    return new Promise((resolve, reject) => {
        axios({method: 'get', url: getAllCitizensUrl,}).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    getAllCitizens
}

const express = require('express')
const router = express.Router()

const citizenService = require('../services/citizenService')

router.get('/citizens', (req, res) => {
    let successMessage = 'successfully returned all citizens'
    let path = '/citizens'
    return citizenService.getAllCitizens()
        .then(citizens => sendSuccessfulResponse(res, successMessage, citizens))
        .catch(err => sendUnsuccessfulResponse(res, err, path))
})

router.get('/citizens/:id', (req, res) => {
    let citizenId = req.params.id
    let successMessage = 'successfully found citizen'
    let path = `/citizens/${citizenId}`
    return citizenService.getCitizenById(citizenId)
        .then(citizen => sendSuccessfulResponse(res, successMessage, citizen))
        .catch(err => sendUnsuccessfulResponse(res, err, path))
})

router.get('/citizens/:city', (req, res) => {
    let city = req.params.city
    let successMessage = `successfully returned all citizens in city ${city}`
    let path = `/citizens/${city}`
    return citizenService.getAllCitizensByCity(city)
        .then(allCitizensInCity => sendSuccessfulResponse(res, successMessage, allCitizensInCity))
        .catch(err => sendUnsuccessfulResponse(res, err, path))
})

router.get('/citizens/:city/:radius', (req, res) => {
    let city = req.params.city
    let radiusInMiles = req.params.radius
    let successMessage = `successfully returned all citizens in and within ${city} with a radius of ${radiusInMiles} miles`
    let path = `/citizens/${city}/${radiusInMiles}`
    return citizenService.getAllCitizensInAndWithinRadiusOfCity(city, radiusInMiles)
        .then(citizensInRadiusOfCity => sendSuccessfulResponse(res, successMessage, citizensInRadiusOfCity))
        .catch(err => sendUnsuccessfulResponse(res, err, path))
})

let sendSuccessfulResponse = (res, message, data) => {
    res.status(200).send({'success': true, 'message': message, 'data': data})
}

let sendUnsuccessfulResponse = (res, message, path) => {
    res.status(500).send({'success': false, 'message': message, 'path': path})
}

module.exports = router
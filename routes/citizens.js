const express = require('express')
const router = express.Router()

const citizenService = require('../services/citizenService')

router.get('/citizens', (req, res) => {
    return citizenService.getAllCitizens()
        .then(citizens => res.status(200).send({
            'success': true, 'message': 'successfully returned all citizens', 'data': citizens}))
        .catch(err => {
            console.log(err)
            res.status(500).send({'success': false, 'message': 'internal server error', 'path': '/citizens'})
        })
})

module.exports = router
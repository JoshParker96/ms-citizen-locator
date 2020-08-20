const axios = require('axios')

const SwaggerCitizenAdaptor = require('../adaptor/swaggerCitizenAdaptor').SwaggerCitizenAdaptor
const GeoCodeCoordinateAdaptor = require('../adaptor/geoCodeCoordinateAdaptor').GeoCodeCoordinateAdaptor
const CoordinateAnalyser = require('../analyser/coordinateAnalyser').CoordinateAnalyser
const CitizenService = require('../services/citizenService').CitizenService

const swaggerCitizenAdaptor = new SwaggerCitizenAdaptor(axios)
const geoCodeAdaptor = new GeoCodeCoordinateAdaptor(axios)
const coordinateAnalyser = new CoordinateAnalyser()

const citizenService = new CitizenService(swaggerCitizenAdaptor, geoCodeAdaptor, coordinateAnalyser)

module.exports = { citizenService }
const express = require('express')
const bodyParser = require('body-parser')

const { port } = require('./config/config')
const citizenRoutes = require('./routes/citizens')

const app = express()

app.use(bodyParser.json())
app.use(citizenRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
const express = require('express')
const bodyParser = require('body-parser')

const citizenRoutes = require('./routes/citizens')

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(citizenRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
const express = require('express')
const router = express.Router()

router.get('/citizens', (req, res) => {
    let body = {
        'name': 'josh'
    }

    res.status(200).json(body)
})

module.exports = router
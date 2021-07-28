require('dotenv').config();
const express = require('express')
const router = express.Router()
const GPSDataDB = require('../models/GPSSchema')



router.get('/', async (req, res) => {
    const data = new GPSDataDB({
        username: "TestUser",
        date: "key",
        hour: "value.hour",
        latitude: "value.latitude",
        longitude: "value.longitude"
    });
    const newData = await data.save();
    res.json(newData)
});


module.exports = router;
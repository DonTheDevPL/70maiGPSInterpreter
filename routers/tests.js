require('dotenv').config();
const express = require('express')
const router = express.Router()
const GPSDataDB = require('../models/GPSSchema')
const mongoose = require('mongoose');

const MongoDBURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/70maiGPSInterpeter?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
mongoose.connect(MongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Database Connected')
}).catch(err => {
    console.log(err)
});


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
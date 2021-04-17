const mongoose = require('mongoose');


const GPSSchema = new mongoose.Schema({
    username: String,
    date: String,
    hour: String,
    latitude: String,
    longitude: String
});

const GPSDataDB = mongoose.model('GpsData', GPSSchema);

module.exports = GPSDataDB;
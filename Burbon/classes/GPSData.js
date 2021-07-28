class GPSData {
    constructor(hour, speed, latitude, longitude, date) {
        this.date = date;
        this.hour = hour;
        this.speed = speed;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = GPSData
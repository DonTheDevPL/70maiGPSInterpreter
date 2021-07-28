class GPSDataWithUser {
    constructor(username, hour, speed, latitude, longitude, date) {
        this.username = username;
        this.date = date;
        this.hour = hour;
        this.speed = speed;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
module.exports = GPSDataWithUser
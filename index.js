fs = require('fs');

class Data {
	constructor(hour, speed, latitude, longitude) {
		this.hour = hour;
		this.speed = speed;
		this.latitude = latitude;
		this.longitude = longitude;
	}
}


fs.readFile('GPSData000001.txt', 'utf8', function (err, data) {
	let globalObj = {};
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let currDate = lines[0].split(',')[0].split(' ')[0];
	let dateArr = [];
	for (let line of lines) {
		let lineArr = line.split(',');
		if (lineArr[0].split(' ')[0] === currDate) {
			let obj = new Data(lineArr[0].split(' ')[1], lineArr[3], lineArr[4], lineArr[5]);
			dateArr.push(obj);
		} else {
			console.log(dateArr);
			globalObj[currDate] = dateArr;
			currDate = lineArr[0].split(' ')[0];
			dateArr = [];
			let obj = new Data(lineArr[0].split(' ')[1], lineArr[3], lineArr[4], lineArr[5]);
			dateArr.push(obj);
		}
	}
	fs.writeFileSync('data.json', JSON.stringify(globalObj, null, 2));
});
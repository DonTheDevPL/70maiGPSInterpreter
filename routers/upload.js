const express = require('express')
const router = express.Router()
const fs = require('fs');

router.post('/upload', function (req, res) {
    let File;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    File = req.files.FileForm;
    uploadPath = __dirname + '/uploads/' + File.name;

    // Use the mv() method to place the file somewhere on your server
    File.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        ParseFile(File.name);
        res.send('File uploaded!');
    });
});

ParseFile = (name) => {
    class Data {
        constructor(hour, speed, latitude, longitude) {
            this.hour = hour;
            this.speed = speed;
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    let Path = __dirname + '/uploads/' + name;
    let Output = __dirname + '/processing/' + name.split('.')[0] + '.json';
    fs.readFile(Path, 'utf8', function (err, data) {
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
                //console.log(dateArr);
                globalObj[currDate] = dateArr;
                currDate = lineArr[0].split(' ')[0];
                dateArr = [];
                let obj = new Data(lineArr[0].split(' ')[1], lineArr[3], lineArr[4], lineArr[5]);
                dateArr.push(obj);
            }
        }
        //fs.writeFileSync(Output, JSON.stringify(globalObj, null, 2));
        /*
            for (const [key, value] of Object.entries(globalObj)) {

                console.log(key);
                for (const [key1, value] of Object.entries(globalObj[key])) {
                    const data = new GPSDataDB({
                        username: "TestUser",
                        date: key,
                        hour: value.hour,
                        latitude: value.latitude,
                        longitude: value.longitude
                    });
                }
            }
        });
*/

    });
}

module.exports = router;
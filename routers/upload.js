const express = require('express');
const router = express.Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const GPSDataDB = require('../models/GPSSchema');


router.post('/upload', function (req, res) {
    let File;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }


    const name = uuidv4();
    File = req.files.FileForm;
    uploadPath = '/files/uploads/' + name;
    console.log(uploadPath);

    File.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        ParseFile(name);
        res.send('File uploaded!');
    });
});

ParseFile = (name) => {
    class Data {
        constructor(hour, speed, latitude, longitude, date) {
            this.date = date;
            this.hour = hour;
            this.speed = speed;
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    let Path = '/files/uploads/' + name;
    fs.readFile(Path, 'utf8', async function (err, data) {
        let arr = [];
        if (err) {
            return console.log(err);
        }
        let lines = data.split('\n');
        for (let line of lines) {
            if (line !== '') {
                const lineArr = line.split(',');
                const obj = new Data(lineArr[0].split(' ')[1], lineArr[3], lineArr[4], lineArr[5], lineArr[0].split(' ')[0]);
                arr.push(obj);
            }
        }
        await GPSDataDB.insertMany(arr);
        console.log('Data saved');
        fs.rm(Path, async function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`File removed`);
        });
    });
};

module.exports = router;
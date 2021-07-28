const express = require('express');
const router = express.Router();
const fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');

const GPSDataDB = require('../models/GPSSchema');


const GPSData = require('../classes/GPSData')
const GPSDataWithUser = require('../classes/GPSDataWithUser')

router.post('/upload', function (req, res) {
    let File;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }


    const name = uuidv4();
    File = req.files.FileForm;
    uploadPath = `/files/uploads/${name}`;

    File.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        ParseFile(name);
        res.send('File uploaded!');
    });
});
router.post('/convertGPS', (req, res) => {
    let File;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const name = uuidv4();
    File = req.files.FileForm;
    uploadPath = `/files/uploads/${name}`;

    File.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        res.json(ConvertData(name))
    })

});

const ConvertData = (name) => {
    const path = `/files/uploads/${name}`;
    const data = fs.readFileSync(path, 'utf8')
    const arr = [];

    const lines = data.split('\n');
    for (const line of lines) {
        if (line !== '') {
            const lineArr = line.split(',');
            const obj = new GPSData(lineArr[0].split(' ')[1], lineArr[3], lineArr[4], lineArr[5], lineArr[0].split(' ')[0]);
            arr.push(obj);
        }
    }
    console.log('Data converted');
    fs.unlinkSync(path);
    return arr;
}

GetDataAfterProcessing = (data) => {

}
ParseFile = (name) => {
    let Path = `/files/uploads/${name}`;
    fs.readFile(Path, 'utf8', async function (err, data) {
        let arr = [];
        if (err) {
            return console.log(err);
        }
        let lines = data.split('\n');
        for (let line of lines) {
            if (line !== '') {
                const lineArr = line.split(',');
                const obj = new GPSDataWithUser("Test User", lineArr[0].split(' ')[1], lineArr[3], lineArr[4], lineArr[5], lineArr[0].split(' ')[0]);
                arr.push(obj);
            }
        }
        await GPSDataDB.insertMany(arr);
        console.log('Data saved');
        fs.unlinkSync(Path);
    });

}

module.exports = router;
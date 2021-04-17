require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongo = require('mongodb');
//const db = require('monk')(`${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/70maiGPSInterpeter?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`);
const mongoose = require('mongoose');
//const MongoDBURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/70maiGPSInterpeter?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
const MongoDBURL = `mongodb://Admin:GSpCwgjny1nKlugn@${process.env.DB_HOST}:${process.env.DB_PORT}/70maiGPSInterpeter?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
mongoose.connect(MongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Database Connected')
}).catch(err => {
    console.log(err)
});
const GPSDataDB = require('./models/GPSSchema')
const _ = require('lodash');
fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(fileUpload({
    createParentPath: true
}));

app.get('/', async (req, res) => {
    //insertData("Twój stary chuj");
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

app.post('/upload', function (req, res) {
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


app.get('/czytaj', (req, res) => {
    console.log("request successful")
    const collection = db.get('Users');
    collection.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
})
app.listen(port, () => {
    console.log(`GPS Interpreter listening at http://localhost:${port}`)
})
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
insertData = (date, hour, speed, lat, long) => {
    const collection = db.get('GPSDataTest');
    collection.insert([{
        user: "test",
        hour: hour,
        speed: speed,
        lat: lat,
        long: long
    }])
        .then((docs) => {
        }).catch((err) => {
        console.log(err)
    }).then(() => db.close())
}
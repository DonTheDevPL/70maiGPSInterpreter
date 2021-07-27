const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const upload = require('../routers/upload')
const tests = require('../routers/tests')

const mongoose = require('mongoose');

const MongoDBURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/70maiGPSInterpeter?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
mongoose.connect(MongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Database Connected')
}).catch(err => {
    console.log(err)
});


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
app.use('/',upload);
app.use('/',tests);



app.listen(port, () => {
    console.log(`GPS Interpreter listening at http://localhost:${port}`)
})
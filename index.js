const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const upload = require('./routers/upload')
const tests = require('./routers/tests')



const _ = require('lodash');

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
app.use('/upload',upload);
app.use('/',tests);



app.listen(port, () => {
    console.log(`GPS Interpreter listening at http://localhost:${port}`)
})

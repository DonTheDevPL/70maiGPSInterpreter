fs = require('fs');
fs.readFile("C:\\GitHub\\70maiGPSInterpreter\\output1.json"
    , 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        let dane = JSON.parse(data);

        console.log(dane);

    });
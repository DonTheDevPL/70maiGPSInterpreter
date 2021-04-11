fs = require('fs');
fs.readFile("C:\\GitHub\\70maiGPSInterpreter\\GPSData000001.txt"
    , 'utf8', function (err, data) {
        class DaneGPS {
            constructor(hour, speed, latitude, longitude) {
                this.hour = hour;
                this.speed = speed;
                this.latitude = latitude;
                this.longitude = longitude;
            }
        }

        if (err) {
            return console.log(err);
        }
        let lines = data.split('\n');
        let lines2 = [];
        let FinallData = [];
        for (let x in lines) {
            lines2.push(lines[x].split(','));

        }
        let temp1 = [];
        for (let x in lines2) {

            let element = lines2[x][0];
            temp1.push(element.split(' '));
        }
        let hours = [];
        for (let x in temp1) {
            FinallData.push(temp1[x][0])
            hours.push(temp1[x][1]);
        }
        let DaneKompletne = {};
        for (let x in FinallData) {
            let klucz2 = FinallData[x];
            if (klucz2 in DaneKompletne) {

            } else {
                DaneKompletne[klucz2] = [];
            }
            const temp= new DaneGPS(hours[x], lines2[x][3], lines2[x][4], lines2[x][5])

            console.log(klucz2);
            let holder = DaneKompletne[klucz2];
            holder.push(temp);
            DaneKompletne[klucz2] = holder;

        }
        fs.writeFileSync("C:\\GitHub\\70maiGPSInterpreter\\output.json", JSON.stringify(DaneKompletne, null, 2), 'utf-8');
    });
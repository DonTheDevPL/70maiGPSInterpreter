fs = require('fs');
fs.readFile("C:\\GitHub\\70maiGPSInterpreter\\GPSData000001.txt"
    , 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        let lines = data.split('\n');
        let lines2 = [];
        let FinallData = [];
        for (let x in lines){
            lines2.push(lines[x].split(','));

        }
        let temp1 = [];
        for (let x in lines2) {

            let element = lines2[x][0];
            temp1.push(element.split(' '));
        }
        let hours = [];
        for (let x in temp1){
            FinallData.push(temp1[x][0])
            hours.push(temp1[x][1]);
        }
        let Gotowe = {};

        for (let x in FinallData){
            if (FinallData[x] in Gotowe){

            }else{
                let klucz2 = FinallData[x];
                Gotowe[klucz2] = [];
            }
        }
        for (let x in FinallData){
            let klucz2 = FinallData[x];
            let temp = [];
                    let temp2 = new Array();
                    temp2.push(hours[x]);
                    temp2.push(lines2[x][3]);
                    temp2.push(lines2[x][4]);
                    temp2.push(lines2[x][5]);
                    temp.push(temp2);


            console.log(klucz2);
            let holder = Gotowe[klucz2];
            holder.push(temp);
            //console.log(holder);
            Gotowe[klucz2] = holder;
            fs.writeFileSync("C:\\GitHub\\70maiGPSInterpreter\\output.json",JSON.stringify(Gotowe, null, 2) , 'utf-8');
        }
    });
const csv = require('csv-parser');
const fs = require('fs');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;

var csvHeaders = [];
var data = [];
// var rowCount = 0;
var regex = /(\d*),(\d*)/gi;

fs.createReadStream('SchoolDetailPreprocessed.csv')
    .pipe(csv())
    .on('headers', (headers) => {        
        headers.map(header => csvHeaders.push({id: header, title: header}));
    })
    .on('data', (row) => {
        var line = [];
        var i = 0;
        for (key in row) {
            let value = row[key];
            if (i == 3) {
                value = value.replace(regex, '$1$2');
            }
            i += 1;
            line[key] = value; 
            // console.log(object);
        }
        data.push(line);
        // schoolSize = schoolSize.parseInt();
    })
    .on('end', ()=>{
        console.log(data);
        console.log(csvHeaders);
        const csvWriter = createCSVWriter({
            path: "SchoolDetail.csv",
            header: csvHeaders
        });
        csvWriter
            .writeRecords(data)
            
    });
console.log("1")
// csvWriter._c

// fs.createWriteStream('SchoolDetail.csv')
//     .pipe(csv)
const csv = require('csv-parser');
const fs = require('fs');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;
const mysql = require('mysql');
// var TestsHeaders = [{id: 'SchoolName', title: "SchoolName"},
//                     {id: 'SATUpper', title: "SATUpper"}, 
//                     {id: 'SATLower', title: "SATLower"}, 
//                     {id: 'ACTUpper', title: "ACTUpper"}, 
//                     {id: 'ACTLower', title: "ACTLower"}];
// var TestData = [];

var tuitionNames = ["general", "in-state", "out-state"];
var tuitionTypes = ["general", "low", "medium-low", "medium", "medium-high", "high"];
var bigDollarAmount = /\$(\d*),(\d*)/gi;
var smallDollarAmount = /\$(\d*)/gi;
var s3Bucket = "https://horizan-images.s3.us-east-2.amazonaws.com/";
var s3UniversityImage = s3Bucket + "Univerisity/";
// var schoolName = /([a-zA-Z_-,'\.]*)(logo.png)/gi;
var logoBucket = s3UniversityImage + "SchoolLogos/";

new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
        host: "horizandb.c0c5mdj3ouo6.us-east-2.rds.amazonaws.com",
        user: "Horizan",
        password: "horizansql",
        port: 3306,
        database: "HorizanDB"
    });
    connection.connect((err) => {
        if (err) {
            console.error('connection error: ' + err.stack);
            reject(err);
        } else {
            resolve(connection);
        }
    });
})
.then(context => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('/Users/Frank/OneDrive/Horizan/LocalFiles/RawData/schoolLogo.csv')
        .pipe(csv())
        .on('data', (row) => {
            // var testScore = [];
            var i = 0;
            var schoolName;
            // var tuitionName;
            // var tuitionType;
            var parameters = [];
            // var appNames = ["Common App", "Coalition App"];
            // let SourceName = "Horizan Readjusted";
            // let majorNames = ["Business", "Communication", "Computer Science", "Biology", "Psychology", "Engineering"]
            // let nlpCategories = ["Reputation", "Facilities", "Happiness", "Clubs", "Location", "Food", "Social", "Opportunites", "Safety", "Internet"];
            // let iValue = [12, 13, 14, 15, 16, 17];
            for (key in row) {
                let value = row[key];
                var imgLink = logoBucket + value;
                // console.log(imgLink);
                schoolName = value.substring(0, value.length - 8);
                schoolName = schoolName.replace(/_/gi, " ");
                parameters.push(schoolName);
                parameters.push(schoolName + " Logo");
                parameters.push("Logo");
                parameters.push(imgLink);
                // var testType;
                // var testLowBound;
                // var testHighBound;
                // if (i == 0) {
                //     schoolName = value;
                //     parameters.push(schoolName);
                //     // console.log(schoolName);
                // } 
                //else 
                // if (i == 0) {
                //     schoolName = value;
                //     if (parameters.indexOf(schoolName) == -1 && schoolName) {
                //         parameters.push(schoolName);
                //     }
                // // } 
                // else {
                //     let nlpCategory = nlpCategories[i - 1];
                //     parameters.push(nlpCategory);
                //     parameters.push(value)
                // }
                // else if (iValue.indexOf(i) != -1) {
                //     parameters.push(MajorName[i - 12]);
                //     parameters.push(SourceName);
                //     parameters.push(value);
                // }
                /*ins test script */
                // else if (i > 0 && i <= 2) {
                //     if (value != "N/A" && value != "") {
                //         var testTypes = ["SAT", "ACT"];
                //         var testType = testTypes[i - 1];
                //         parameters.push(testType);
                //         var scores = value.split("-");
                //         parameters.push(scores[0]);
                //         parameters.push(scores[1]);
                    // }
                // } 
                // else {
                //     if (value != "N/A" && value != ""){
                //         var testType = "ACT";
                //         if (parameters.indexOf(testType) == -1) {parameters.push(testType);}
                //         switch (i) {
                //             case 3:
                //                 testLowBound = value;
                //                 parameters.push(testLowBound);
                //                 break;
                //             case 4: 
                //                 testHighBound = value;
                //                 parameters.push(testHighBound);
                //         }
                //         console.log(parameters);                
                //     }
                // } 
                /**tuition scrit */
            //     if (i >= 3 && i <= 9) {
            //         var dollarAmountRegex;
            //         var parsingComponents;
            //         if (value != "N/A") {
            //             if (value.length > 4) {
            //                 dollarAmountRegex = bigDollarAmount;
            //                 parsingComponents = '$1$2';
            //             } else {
            //                 dollarAmountRegex = smallDollarAmount;
            //                 parsingComponents = '$1';
            //             }
            //             let tuitionAmount = value.replace(dollarAmountRegex, parsingComponents);
            //             switch (i) {
            //                 case 3:
            //                     tuitionName = "in-state";
            //                     tuitionType = "general";
            //                     break;
            //                 case 4:
            //                     tuitionName = "out-state";
            //                     tuitionType = "general";
            //                     break;
            //                 case 5:
            //                     tuitionName = "general";
            //                     tuitionType = "low";
            //                     break;
            //                 case 6:
            //                     tuitionName = "general";
            //                     tuitionType = "medium-low";
            //                     break;
            //                 case 7:
            //                     tuitionName = "general";
            //                     tuitionType = "medium";
            //                     break;
            //                 case 8:
            //                     tuitionName = "general";
            //                     tuitionType = "medium-high";
            //                     break;
            //                 case 9:
            //                     tuitionName = "general";
            //                     tuitionType = "high";
            //                     break;
            //                 default:
            //                     break;
            //             }
            //             parameters.push(tuitionName);
            //             parameters.push(tuitionType);
            //             parameters.push(tuitionAmount);
            //         }
            // }
            // else if (i > 9 && i < 12) {
            //     if (value != "N/A") {
            //         var appName = appNames[i - 10];
            //         // console.log(appName);
            //         parameters.push(appName);
            //     }
            // }
            // else if (i >= 12) {
            //     var majorName = majorNames[i - 12];
            //     var sourceName = "Horizan Readjusted";
            //     var majorRanking = value;
            //     parameters.push(majorName, sourceName, majorRanking);
            // }
            // console.log(testScore);
            // console.log(parameters);
            if (parameters.length == 4) {
                var SQLQuery = getSQLQuery("pInsSchoolImage", parameters);
                console.log(SQLQuery);
                parameters = [];
                parameters.push(schoolName);
                context.query(SQLQuery, function (error, results){
                    if (error){
                        console.log(schoolName);
                        console.error('error: ' + error.stack);
                        reject(error);
                    }
                });
            } else if (parameters > 3) {
                parameters = [];
                parameters.push(schoolName);
            }
            //handle 
            i += 1;
            }
        });
        // .on('end', ()=>{
        //     const csvWriter = createCSVWriter({
        //         path: "./LocalFiles/RawData/CollegeTestData.csv",
        //         header: TestsHeaders
        //     });
        //     console.log(TestData);
        //     csvWriter
        //         .writeRecords(TestData)
                
        // });
        resolve(context);
    });
})
.then(context => {console.log("finished");})
.catch(err => {console.error(err.stack); });
//sanitize Test scores




function getSQLQuery(procedureName, parameters) {
    var query = 'Call ' + procedureName + '("' + parameters[0] + '"';
    for (let i = 1; i < parameters.length; i++) {
        var parameter;
        // if (i == 1) {
            parameter = '"' + parameters[i] + '"';
        // } else {
            // parameter = parameters[i];
        // }
        query += (', ' + parameter);
    }
    query += ');';
    return query;
}
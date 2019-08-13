const mysql = require('mysql');
const HashMap = require('hashmap');
const fs = require('fs');

const proccessedData = async () => {
    const tick = Date.now();
    const db = mysql.createConnection({
        host: "horizandb.c0c5mdj3ouo6.us-east-2.rds.amazonaws.com",
        user: "Horizan",
        password: "horizansql",
        port: 3306,
        database: "HorizanDB"
    });
    try {
        await db.connect()
        console.log("Connection successful");
    } catch (err) {
        console.error('connection error: ' + err.stack);
        reject(err);
    }

    const schoolList = await new Promise((resolve, reject) => db.query('Select distinct SchoolName from SchoolDetail', function (error, results) {
        if (error) {
            console.error('error: ' + error.stack);
            reject(error);
        } else {
            const list = [];
            for (obj in results) {
                for (schoolName in results[obj]) {
                    list.push(results[obj][schoolName])
                }
            }
            resolve(list);
        }
    }));

    const preparedData = await new HashMap();
    const addDetails = async () => {
        console.log("Adding School Details...");
        for (const schoolName of schoolList) {
            const schoolDetail = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolDetail("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            for (obj in results[0]) {
                                resolve(results[0][0]) //adding quotation mark to the object name for easier parsing 
                            }
                        }
                    }
                )
            );
            preparedData.set(schoolName, schoolDetail);
        }
    }

    const addNLP = async () => {
        console.log("Adding School NLP Info...");
        for (const schoolName of schoolList) {
            await function () {preparedData.get(schoolName)["NLP"] = [];}
            const schoolNLP = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolNLP("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalNLP = {};
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                var counter = 0;
                                var category;
                                var rating; 
                                for (header in obj) {
                                    if (counter == 0) {
                                        category = "" + obj[header];
                                    } else {
                                        rating = obj[header];
                                    }
                                    counter++;
                                }
                                finalNLP[category] = rating;
                            }
                            resolve(finalNLP);
                        }
                    }
                )
            );
            preparedData.get(schoolName)["NLP"] = schoolNLP;
        }
    }
    const addTuition = async () => {
        console.log("Adding School Tuition Info...");
        for (const schoolName of schoolList) {
            await function () {preparedData.get(schoolName)["Tuition"] = [];}
            const schoolTuition = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolTuition("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalTuition = {};
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                var counter = 0;
                                var type;
                                var amount; 
                                for (header in obj) {
                                    if (counter == 0) {
                                        type = "" + obj[header];
                                    } else {
                                        amount = obj[header];
                                    }
                                    counter++;
                                }
                                finalTuition[type] = amount;
                            }
                            resolve(finalTuition);
                        }
                    }
                )
            );
            preparedData.get(schoolName)["Tuition"] = schoolTuition;
        }
    }
    //TODO: 
    const addTest = async () => {
        console.log("Adding School Test Info...");
        for (const schoolName of schoolList) {
            await function () {preparedData.get(schoolName)["Test"] = {};}
            const schoolTest = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolTest("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalTest = {};
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                var counter = 0;
                                var test;
                                var score; 
                                var testObject = {};
                                for (header in obj) {
                                    if (counter == 0) {
                                        test = "" + obj[header];
                                        finalTest[test] = {};
                                    } else {
                                        score = obj[header];
                                        var testHeader = test + "" + header.toString().substring(5, header.length);
                                        testObject[testHeader] = score;
                                        finalTest[test] = testObject;
                                    }
                                    counter++;
                                }
                            }
                            resolve(finalTest);
                        }
                    }
                )
            );
            preparedData.get(schoolName)["Test"] = schoolTest;
        }
    }


    const addMajor = async () => {
        console.log("Adding School Major Info...");
        for (const schoolName of schoolList) {
            await function () {preparedData.get(schoolName)["Majors"] = [];}
            const schoolMajor = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolMajorRanking("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalMajors = {};
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                var counter = 0;
                                var major;
                                var ranking; 
                                for (header in obj) {
                                    if (counter == 0) {
                                        major = "" + obj[header];
                                    } else {
                                        ranking = obj[header];
                                    }
                                    counter++;
                                }
                                finalMajors[major] = ranking;
                            }
                            resolve(finalMajors);                        
                        }
                    }
                )
            );
            preparedData.get(schoolName)["Major"] = schoolMajor;

            const outputDir = '../schoolJSON/';
            // console.log("writing JSON file to " + outputDir);
            let fileName = schoolName + '.json';
            let fileDir = outputDir + fileName;
            console.log("writing " + fileDir);
            let data = preparedData.get(schoolName);
            data = JSON.stringify(data, "", 3);
            fs.writeFile(fileDir, data, err => {
                if (err) return console.error(err)
                console.log('Finished writing JSON files.')
            });
        }
    }

    await addDetails();
    await addNLP();
    await addTuition();
    await addTest();
    await addMajor();
    // await console.log(preparedData.get('University of Washington'))
    await console.log(Date.now() - tick);
    
}

proccessedData();




    // var schoolList = ['Adelphi University',
    //     'American University',
    //     'Andrews University',
    //     'Arizona State University- Tempe',
    //     'Ashland University',
    //     'Auburn University',
    //     'Azusa Pacific University',
    //     'Ball State University',
    //     'Baylor University',
    //     'Benedictine University'
    // ];

    // function getSchoolDetail(schoolName) {
    //     return new Promise((resolve, reject) => db.query('call pGetSchoolDetail("' + schoolName + '")', function (error, results) {
    //         if (error) {
    //             console.error('error: ' + error.stack);
    //             reject(error);
    //         } else {
    //             for (obj in results[0]) {
    //                 resolve(results[0][obj])
    //             }
    //         }
    //     }));
    // }
    // let promises = schoolList.map(schoolName => {
    //     return getSchoolDetail(schoolName)
    //         .then(schoolDetail => {
    //             return schoolDetail;
    //         })
    // })

    // const preparedData = await new HashMap();
    // await Promise.all(promises)
    //     .then(results => {
    //         results.map(schoolDetail => {
    //             preparedData.set(schoolDetail.SchoolName, schoolDetail);
    //         })
    //     })
    //     .catch(e => {
    //         console.error(e);
    //     })

    // const preparedData = async () => {
    //     const details = await new HashMap();
    //     let values;

    //     for (const schoolName of schoolList) {
    //         await details.set(schoolName, getSchoolDetail(schoolName));
    //     }
    //     try {
    //         values = await Promise.all(details);
    //         console.log(values);
    //         return details;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

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

    const addApplication = async () => {
        console.log("Adding School Application Info...");
        for (const schoolName of schoolList) {
            await function () {preparedData.get(schoolName)["ApplicationName"] = [];}
            const schoolNLP = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolApplication("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalApplications = [];
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                for (header in obj) {
                                    finalApplications.push(obj[header]);
                                }
                            }
                            resolve(finalApplications);
                        }
                    }
                )
            );
            preparedData.get(schoolName)["ApplicationName"] = schoolNLP;
        }
    }

    const addTuition = async () => {
        console.log("Adding School general tuition info...");
        for (const schoolName of schoolList) {
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
            preparedData.get(schoolName)["Tuition"] = {};
            preparedData.get(schoolName)["Tuition"]["General"] = {};
            preparedData.get(schoolName)["Tuition"]["General"] = schoolTuition;
        }
    }
    
    const addTuition2 = async () => {
        console.log("Adding School income specific tuition Info...");
        for (const schoolName of schoolList) {
            await function () {
                preparedData.get(schoolName)["Tuition"]["IncomeSpecific"] = [];
            }
            const schoolTuition = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolIncomeSpecificTuition("' + schoolName + '")', 
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
            preparedData.get(schoolName)["Tuition"]["IncomeSpecific"] = schoolTuition;
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
        }
    }

    const addLogo = async () => {
        console.log("Adding School Logo Image Info...");
        for (const schoolName of schoolList) {
            const schoolLogo = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolLogo("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var logoURL;
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                for (header in obj) {
                                    imageURL = "" + obj[header];
                                }
                                logoURL = imageURL;
                            }
                            resolve(logoURL);                        
                        }
                    }
                )
            );
            preparedData.get(schoolName)["Image"] = {};
            preparedData.get(schoolName)["Image"]["Logo"] = {};
            preparedData.get(schoolName)["Image"]["Logo"] = schoolLogo;
        }
    }

    const addGeneralImage = async () => {
        console.log("Adding School General Image URL...");
        for (const schoolName of schoolList) {
            const schoolImage = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolGeneralImage("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalImages = [];
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                for (header in obj) {
                                    finalImages.push("" + obj[header]);
                                }
                            }
                            resolve(finalImages);                        
                        }
                    }
                )
            );
            preparedData.get(schoolName)["Image"]["General"] = schoolImage;

        }
    }


    //
    const addDeadline = async () => {
        console.log("Adding Deadline data...");
        for (const schoolName of schoolList) {
            const deadline = await new Promise(
                (resolve, reject) => db.query('call pGetSchoolDeadlines("' + schoolName + '")', 
                    function (error, results) {
                        if (error) {
                            console.error('error: ' + error.stack);
                            reject(error);
                        } else {
                            results = JSON.parse(JSON.stringify(results));
                            var finalDeadlines = {};
                            for (obj in results[0]) {
                                obj = results[0][obj];
                                var counter = 0;
                                var deadlineName;
                                var deadlineDatetime; 
                                for (header in obj) {
                                    if (counter == 0) {
                                        deadlineDatetime = "" + obj[header];
                                    } else {
                                        deadlineName = obj[header];
                                    }
                                    counter++;
                                }
                                finalDeadlines[deadlineName] = deadlineDatetime;
                                // console.log(deadlineName + ": " + deadlineDatetime);
                            }
                            resolve(finalDeadlines);    
                        }                
                    }
                )
            );
            preparedData.get(schoolName)["Deadlines"] = deadline;
        }
        console.log("Finished all data processing.")
    }

    const writeToFile = async () => {
        console.log("Start file writing...")
        for (const schoolName of schoolList) {
            const outputDir = '../schoolJSON/';
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
    await addApplication();
    await addTuition();
    await addTuition2();
    await addTest();
    await addMajor();
    await addLogo()
    await addGeneralImage();
    await addDeadline();
    await writeToFile();
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

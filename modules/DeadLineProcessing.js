const mysql = require('mysql');
const fs = require('fs');

const dataUpload = async() => {

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

    const applicationNames = ['Regular Decision', 'Early Decision', 'Early Action', 'Regular Decision Priority Application'];
    const deadlineNames = ['regularDecisionDeadline', 'earlyDecisionDeadline', 'earlyActionDeadline', 'regularDecisionPriorityApplicationDeadline'];
    const rawData = await new Promise((resolve, reject) => fs.readFile('../RawData/deadlines.json', (err, data) => {
            if (err) throw err;
            resolve(data);
        }));
    let data = JSON.parse(rawData);
    // console.log(data);
    let deadlineCycle = [2020, 'AU'];
    var studentType = 'Incoming Freshman';
    var a = 0;
    for (schoolName in data) {
        // var args = ;
        a += 1;
        var deadlineDatetime;
        for (key in data[schoolName]) {
            var applicationName = applicationNames[deadlineNames.indexOf(key)];
            if (deadlineNames.includes(key) && data[schoolName][key] != 'N/A') {
                var schoolArgs = [schoolName];
                deadlineDatetime = data[schoolName][key];
                if (data[schoolName][key] == 'rolling') {
                    deadlineDatetime = '9999-12-31T00:00:00.000Z';
                }
                schoolArgs = insertArgs(schoolArgs, applicationName, deadlineCycle, studentType, deadlineDatetime);
                console.log(schoolArgs);
                let procedureHead = 'call pInsSchoolDeadline('
                let sqlQuery = querify(procedureHead, schoolArgs);
                db.query(sqlQuery, 
                    function (error, results) {
                        if (error) {
                            console.log('   ERROR QUERY: ' + sqlQuery);
                            console.error(schoolName + ' ERROR: ' + error.stack);
                        } else {
                            console.log('FINISHED QUERY: ' + sqlQuery);
                        }
                });
                console.log(sqlQuery);
            }
            // console.log (key + ": " + data[obj][key]);
        }
    }
    console.log(a);
}

dataUpload();

function insertArgs(args, applicationName, deadineCycle, studentType, deadlineDatetime) {
    let cycleYear = deadineCycle[0];
    let cycleSeason = deadineCycle[1];
    args.push(applicationName, cycleYear, cycleSeason, studentType, deadlineDatetime);
    return args;
}

function querify(procedureHead, args) {
    var query = procedureHead;
    query += '"' + args[0] + '"';
    for (let i = 1; i < args.length; i++) {
        query += ', "' + args[i] + '"';
    }
    query += ')';
    return query;
}
const mysql = require('mysql');
const HashMap = require('hashmap');

var promise = new Promise((resolve, reject) => {
    const sql = mysql.createConnection({
        host: "horizandb.c0c5mdj3ouo6.us-east-2.rds.amazonaws.com",
        user: "Horizan",
        password: "horizansql",
        port: 3306,
        database: "HorizanDB"
    });
    sql.connect((err) => {
        if (err) {
            console.error('connection error: ' + err.stack);
            reject(err);
        } else {
            resolve(sql);
        }
    });
})
.then (context => {
    return new Promise((resolve, reject) => {
        context.query('Select distinct SchoolName from SchoolDetail', function(error, results) {
          if (error) {
              console.error('error: ' + error.stack);
              reject(error);
          } else {
            var schoolList = [];
            //   resolve(schoolList);
            for (obj in results) {
                for (schoolNum in results[obj]) {
                    schoolList.push(results[obj][schoolNum]);
                }
            }
            var resolvedContext = [];
            resolvedContext.push(schoolList);
            resolvedContext.push(context);
            resolve(resolvedContext);
          }
      })
  })  
})
.then(context => {
    return new Promise((resolve, reject) => {
        var schoolList = context[0];
        var connection = context[1];
        var preparedData = new HashMap();
        schoolList.map((schoolName) => {
            preparedData.set(schoolName, {});
        });
        var resolvedContext = [];
        resolvedContext.push(preparedData);
        resolvedContext.push(connection);
        resolve(resolvedContext);
    })
})
.then(context => {
    var p = new Promise((resolve, reject) => {
        var preparedData = context[0];
        var connection = context[1];
        var p1 = new Promise((resovlve, reject) => {
            preparedData.keys().map((schoolName) => {
                connection.query('call pGetSchoolDetail("' + schoolName + '")', function(error, results) {
                    if (error) {
                        console.error('error: ' + error.stack);
                        reject(error);
                    } else {
                        for (obj in results[0]) {
                            // preparedData.push(results[0][obj]);
                            preparedData.set(schoolName, JSON.stringify(results[0][obj]));
                            // console.log(preparedData.get(schoolName));
                        }
                    }
                })  
            })
        })
        .then(resolve(preparedData));
        // }).then(resolve(preparedData));
    })
    
    return p;
})
.then(context => {
    return new Promise((resolve,reject) => {
        var preparedData = context;
        console.log(preparedData);
    });
})
.catch(err => {console.error(err.stack)});

function returnData() {
    return preparedData;
}
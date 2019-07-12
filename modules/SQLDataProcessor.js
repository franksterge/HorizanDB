const mysql = require('mysql');
new Promise((resolve, reject) => {
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
      var schoolList;
      context.query('Select distinct SchoolName from vAllSchoolData', function(error, results) {
          if (error) {
              console.error('error: ' + error.stack);
              reject(error);
          } else {
              schoolList = results;
              console.log(schoolList.length);
          }
      })
      
    //   context.query('Select * from vAllSchoolData', function (error, results) {
    //       if (error) {
    //           console.error('error: ' + error.stack);
    //           reject(error);
    //       } else {
    //           console.log(results);
    //       }
    //   })
    resolve(context);
  })  
})
.then(context => {
})
.then(context => {console.log("finished")})
.catch(err => {console.error(err.stack)});

const mysql = require('mysql');

const connection = mysql.createConnection({
        host: "18.191.72.163",
        user: "root",
        port: 3306,
        database: "HorizanDB"
});
connection.query('SELECT * From SchoolDetail', function (error, results, fields) {
    if (error) throw error;
    console.log('Result: ', results);
});
connection.end();
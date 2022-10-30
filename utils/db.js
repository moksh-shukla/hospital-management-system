const mysql = require('mysql');

const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'lakshay@31',
    database: 'hms',
    multipleStatements: true
});

db.connect((err) => {
    if(err) {
        console.log("MysSQL not connected");
        throw err;
    }
    console.log("MySQL connected");
});

module.exports = db;
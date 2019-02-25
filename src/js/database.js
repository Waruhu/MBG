var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'db_mbg'
});

connection.connect(function(err) {
    if(err){
        console.log("Koneksi Database Gagal");
        throw err;
    }
});
module.exports =  connection;


//Making connection with db

var mysql = require('mysql');
var con = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "12345",
database:"workindia",
insecureAuth : true
});
con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});
module.exports = con;

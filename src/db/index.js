const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected");
  connection.query("CREATE DATABASE express_db", function (err, result) {
    if (error) throw error;
    console.log("database created");
  });
});

connection.connect();

module.exports = connection;

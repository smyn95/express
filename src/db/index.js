require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected");
  connection.query("CREATE DATABASE express_db", function (error, result) {
    if (error) throw error;
    console.log(result);
  });
});

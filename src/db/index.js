const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "9593",
  port: 3306,
  database: "slog",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected");
  connection.query("CREATE DATABASE express_db", function (error, result) {
    if (error) throw error;
    console.log(result);
  });
});

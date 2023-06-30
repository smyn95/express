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
  if (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
  console.log("Connected to the database");

  connection.query(
    `
    CREATE TABLE IF NOT EXISTS _posts (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES _users(id)
    )
    `,
    function (error, result) {
      if (error) {
        console.error("Error creating _posts table:", error);
        throw error;
      }
      console.log("Created _posts table");
    }
  );
});

module.exports = { connection };

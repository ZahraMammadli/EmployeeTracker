const mysql = require("mysql2");

// Create connection to the db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees",
});
module.exports = db;

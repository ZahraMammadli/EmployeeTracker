const mysql = require("mysql2");
const cTable = require("console.table");

// Create connection to the db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees",
});

const allEmployees = connection.query(
  "SELECT * FROM employee",
  function (err, results, fields) {
    console.table(results);
  }
);

module.exports = { allEmployees };

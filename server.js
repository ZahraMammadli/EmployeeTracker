// Importing necessary packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const { allEmployees } = require("./utils/addRetrieveEmployee");
const cTable = require("console.table");

// Create connection to the db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees",
});

// promting user for questions

const main = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "View All Depratments",
        "Add Depratment",
      ],
      name: "actions",
    })
    .then((answers) => {
      switch (answers.actions) {
        case "View All Employees":
          allEmployees();
          break;
        case "View All Depratments":
          allDepartments();
          break;
      }
    });
};

//function to display all employees//
function allEmployees() {
  console.log("List of all Employees");
  connection.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;
    console.table(data);
    main();
  });
}
//function to view all departments//
function allDepartments() {
  console.log("All departments:");
  connection.query(`SELECT * FROM department`, (err, data) => {
    if (err) throw err;
    console.table(data);
    main();
  });
}

main();

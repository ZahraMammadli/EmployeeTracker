// Importing necessary packages
const inquirer = require("inquirer");

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
        "Add a Role",
        "View All Depratments",
        "Add Depratment",
      ],
      name: "actions",
    })
    .then((answers) => {
      //   console.log(answers);
      switch (answers.actions) {
        case "View All Employees":
          runSql(allEmpl);
          break;
        case "View All Depratments":
          runSql(allRls);
          break;
        case "View All Roles":
          runSql(allDpt);
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Update Employee Role":
          updRole();
          break;
        case "Add Depratment":
          addDep();
          break;
      }
    });
};

module.exports = { main };
// Importing necessary function here to avoid circular dependency
const { allEmpl, allRls, allDpt } = require("./utils/sqlScripts");
const { runSql } = require("./lib/views");
const { addRole, addEmp, updRole } = require("./lib/employee");
const { addDep } = require("./lib/department");

main();

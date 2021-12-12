// Importing necessary packages
const inquirer = require("inquirer");
const {
  allEmpl,
  allRls,
  allDpt,
  addDep,
  addRole,
} = require("./utils/sqlScripts");
const cTable = require("console.table");
const mysql = require("mysql2");
const util = require("util");
const { copyFileSync } = require("fs");

// Create connection to the db
const db = mysql.createConnection({
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
        "Add a Role",
        "View All Depratments",
        "Add Depratment",
      ],
      name: "actions",
    })
    .then((answers) => {
      console.log(answers);

      //   switch (answers.actions) {
      //     case "View All Employees":
      //       runSql(allEmpl);
      //       break;
      //     case "View All Depratments":
      //       runSql(allRls);
      //       break;
      //     case "View All Roles":
      //       runSql(allDpt);
      //       break;
      //   }
    });
};

//  Function to run sql scripts returning data
// runSql = (script) => {
//   const results = query(script)
//     .then((data) => {
//       console.table(data);
//       return db.end;
//     })
//     .then(() => main())
//     .catch((err) => console.log(err));
//   return results;
// };

// //  Function to run sql scripts to add data
// modifySql = (script, responce) => {
//   query(script, responce, (err, data) => {
//     if (err) throw err;
//     console.table(data);
//     main();
//   });
// };

// // Function to map column names by ids

// const showDep = () => {
//   db.query(`SELECT * FROM employee_role`, function (err, results, fields) {
//     if (err) {
//       console.log(err.message);
//       return;
//     }

//     // Create empty array for storing info
//     roleArr = [];
//     // console.log(roleArr);
//     // for each item in the results array, push the name of the roles to the roles array
//     // console.log("This is results part" + results);
//     results.forEach((item) => {
//       roleArr.push(item.title);
//     });
//     console.log(roleArr);
//   });
// };

// // main();

// showDep(allDpt);

module.exports = { main };

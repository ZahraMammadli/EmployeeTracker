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
        "Add a Role",
        "View All Depratments",
        "Add Depratment",
      ],
      name: "actions",
    })
    .then((answers) => {
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
        case "Add Depratment":
          inquirer
            .prompt({
              type: "input",
              name: "name",
              message: "What is the name of your department?",
            })
            .then((responce) => {
              //   console.log(responce.name);
              modifySql(addDep, responce.name);
            });
          break;
        case "Add a Role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Please enter title of new role",
              },
              {
                type: "input",
                name: "salary",
                message: "Please enter salary for new role",
              },
              {
                type: "list",
                name: "department_id",
                message: "Please choose department for new role",
                choices: showDep(allDpt),
              },
            ])
            .then((responce) => {
              //   console.log(responce);
              modifySql(
                addRole,
                `${responce.title},${responce.salary},${responce.department_id}`
              );
            });
          break;
      }
    });
};

//  Function to run sql scripts returning data
runSql = (script) => {
  connection.query(script, (err, data) => {
    if (err) throw err;
    console.table(data);
    main();
  });
};
//  Function to run sql scripts to add/modify data
modifySql = (script, responce) => {
  connection.query(script, responce, (err, data) => {
    if (err) throw err;
    console.table(data);
    main();
  });
};

// Function to map column names by ids

showDep = (script) => {
  connection.query(script, (err, response) => {
    if (err) throw err;
    const departments = response.map((element) => {
      console.log({ name: `${element.name}` });

      return { name: `${element.name}` };
    });
  });
};

main();

// showDep(allDpt);

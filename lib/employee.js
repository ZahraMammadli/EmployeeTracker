// Importing necessary packages
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("../config/connection");
const { main } = require("../server");

// Function to add Role
const addRole = () => {
  db.query(`SELECT * FROM department`, (err, results, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }

    // Create empty array for storing department info
    let depArr = [];

    results.forEach((item) => {
      depArr.push(item.name);
    });
    // console.log(depArr);
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
          choices: depArr,
        },
      ])
      .then((response) => {
        let dep_id;
        //   Loop to match answer from user to the dep id in the array
        for (i = 0; i < depArr.length; i++) {
          if (response.department_id === depArr[i]) {
            dep_id = i + 1;
          }
        }
        db.query(
          `INSERT INTO  employee_role (title, salary, department_id)
      VALUES (?,?,?)`,
          [response.title, response.salary, dep_id],
          (err, data) => {
            if (err) {
              console.log(err.message);
              return;
            }
            console.log("Employee updated!");
            main();
          }
        );
      });
  });
};

// Function to add employee
const addEmp = () => {
  db.query("SELECT * from employee_role", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    // Create empty array for storing role info
    let roleArr = [];

    data.forEach((item) => {
      roleArr.push(item.title);
    });
    db.query("SELECT * from manager", (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }

      // Create empty array for storing role info
      let mngArr = [];

      data.forEach((item) => {
        mngArr.push(item.first_name);
      });
      // console.log(depArr);
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Please enter employee first name",
          },
          {
            type: "input",
            name: "last_name",
            message: "Please enter employee last name",
          },
          {
            type: "list",
            name: "role_id",
            message: "Please enter employee role",
            choices: roleArr,
          },
          {
            type: "confirm",
            name: "mngt_confirm",
            message: "Is your employees role a manager position?",
          },
          {
            type: "list",
            name: "mng_id",
            message: "Please enter manager of your employee",
            when: ({ mngt_confirm }) => {
              if (!mngt_confirm) {
                return true;
              } else {
                return false;
              }
            },
            choices: mngArr,
          },
        ])
        .then((response) => {
          let role_id;
          //   Loop to match answer from user to the dep id in the array
          for (i = 0; i < roleArr.length; i++) {
            if (response.role_id === roleArr[i]) {
              role_id = i + 1;
            }
          }
          // if statement that will decide weather or not based on users input if the employee is a manager or not
          let manager_confirm;
          if (response.mngt_confirm === true) {
            manager_confirm = 1;
          } else {
            manager_confirm = 0;
          }
          let mng_id;
          // if the mngt_pick prompt was not run and returns nothing set the manager_id to null
          if (!response.mngt_pick) {
            mng_id = null;
            // else Create a loop of the manager arr in order to compare the users answer to the position it is in in the array,
            // this will provide us with a number that can be used as an id for the manager_id section of our table
          } else {
            for (i = 0; i < manArr.length; i++) {
              if (response.mngt_pick === mngArr[i]) {
                mng_id = i + 1;
              }
            }
          }
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_confirm)
          VALUES (?, ?, ?, ?, ?)`,
            [
              response.first_name,
              response.last_name,
              role_id,
              mng_id,
              manager_confirm,
            ],
            (err, results, fields) => {
              if (err) {
                console.log(err.message);
                return;
              }
              console.log("Employee updated!");
              main();
            }
          );
        });
    });
  });
};

// Function to update employee Role
const updRole = () => {
  db.query("SELECT * from employee_role", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    // Create empty array for storing role info
    let roleArr = [];

    data.forEach((item) => {
      roleArr.push(item.title);
    });
    db.query(
      `SELECT first_name, last_name FROM employee`,
      function (err, results, fields) {
        if (err) {
          console.log(err.message);
        }

        let nameArr = [];
        results.forEach((item) => {
          nameArr.push(item.first_name);
          nameArr.push(item.last_name);
        });
        let combinedNameArr = [];
        for (let i = 0; i < nameArr.length; i += 2) {
          if (!nameArr[i + 1]) break;
          combinedNameArr.push(`${nameArr[i]} ${nameArr[i + 1]}`);
        }
        // console.log(depArr);
        inquirer
          .prompt([
            {
              type: "list",
              name: "name_select",
              message: "Please select an employee you would like to update",
              choices: combinedNameArr,
            },
            {
              type: "list",
              name: "role_select",
              message:
                "Please select a role you would like your employee to change to:",
              choices: roleArr,
            },
          ])
          .then((data) => {
            let role_id;
            for (let i = 0; i < roleArr.length; i++) {
              if (data.role_select === roleArr[i]) {
                role_id = i + 1;
              }
            }
            let selectedNameArr = data.name_select.split(" ");
            let last_name = selectedNameArr.pop();
            let first_name = selectedNameArr[0];

            db.query(
              `UPDATE employee 
                                      SET role_id = ?
                                      WHERE first_name = ? AND last_name = ?`,
              [role_id, first_name, last_name],
              function (err, results, fields) {
                if (err) {
                  console.log(err.message);
                  return;
                }
                console.log("Employee updated!");
                main();
              }
            );
          });
      }
    );
  });
};

module.exports = { addRole, addEmp, updRole };

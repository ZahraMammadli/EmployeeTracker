const inquirer = require("inquirer");
const cTable = require("console.table");
const { main } = require("../server");
const db = require("../config/connection");

// Function to add department

const addDep = () => {
  inquirer
    .prompt({
      type: "text",
      name: "dep_name",
      message:
        "Please enter the name of the department you would like to add: ",
    })
    .then((data) => {
      db.query(
        `INSERT INTO department (name)
                VALUES(?)`,
        [data.dep_name],
        function (err, results, fields) {
          if (err) {
            console.log(err.message);
            return;
          }

          console.log("Added department!");
          main();
        }
      );
    });
};

module.exports = { addDep };

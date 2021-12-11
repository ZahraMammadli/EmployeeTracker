const mysql = require("mysql2");

// Create connection to the db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees",
});

const allEmpl = `SELECT a.id as employee_id, a.firts_name , a.last_name, b.title, d.name as department, b.salary,  concat(c.firts_name," ",c.last_name) as Manager FROM employee a 
JOIN employee_role b on a.role_id=b.id
JOIN department d on b.department_id=d.id
LEFT JOIN employee c on a.manager_id = c.id`;
const allDpt = `SELECT * FROM department`;
const allRls = `SELECT a.id as role_id, a.title as role_title, a.salary, d.name as department FROM employee_role a
JOIN department d on a.department_id=d.id`;
const addDep = `INSERT INTO  department (name)
VALUES (?)`;
const addRole = `INSERT INTO  employee_role (title, salary, department_id)
VALUES (?)`;

const getAddRoleQuery = (input, callBack) => {
  connection.query(`INSERT INTO  employee_role (title, salary, department_id)
VALUES (?)`, input.salary, input.title, callBack);};

module.exports = { allEmpl, allRls, allDpt, addDep, addRole };

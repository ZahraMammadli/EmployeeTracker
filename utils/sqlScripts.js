const mysql = require("mysql2");

// Create connection to the db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees",
});

// SQL queries for select function

const allEmpl = `SELECT a.id as employee_id, a.firts_name , a.last_name, b.title, d.name as department, b.salary,  concat(c.firts_name," ",c.last_name) as Manager FROM employee a
JOIN employee_role b on a.role_id=b.id
JOIN department d on b.department_id=d.id
LEFT JOIN employee c on a.manager_id = c.id`;
const allDpt = `SELECT * FROM department`;
const allRls = `SELECT a.id as role_id, a.title as role_title, a.salary, d.name as department FROM employee_role a
JOIN department d on a.department_id=d.id`;

module.exports = { allEmpl, allRls, allDpt };

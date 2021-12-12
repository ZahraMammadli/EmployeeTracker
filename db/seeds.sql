USE employees;

INSERT INTO department (name)
VALUES ("Commercial"),
       ("Engineering"),
       ("Marketing"),
       ("Finance"),
       ("Legal");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Commercial Manager", 6500, 1),
       ("Senior software developer", 6000, 2 ),
       ("QA team lead", 4500, 2),
       ("Marketing manager", 5500, 3),
       ("Digital marketing intern", 2600, 3),
       ("Back end developer", 4400, 2),
       ("Chief accountant", 7800, 4),
       ("legal councel", 5000, 5),       
       ("UX/UI desginer", 3780, 2);
  

INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_confirm)
VALUES ("Zahra", "Mammadli",2 , null, true ),
       ("Milhause", "Van Houten", 1, null, true),
       ("Homer","Simpson", 3, 2, false),
       ("Marge","Simpson",4, 1, false),
       ("Maggie" ,"Simpson", 5, 1, false),
       ("Bart","Simpson", 6, 2, false),
       ("Lisa", "Simpson",7, null, false),
       ("Montgomerry", "Berns", 8, null, false),
       ("Principal", "Skinner", 9, 1, false),
       ("Ned", "Flanders", 3, 1, false);
 
 INSERT INTO manager (first_name, last_name)
SELECT first_name,
    last_name
FROM employee
WHERE manager_confirm = 1;
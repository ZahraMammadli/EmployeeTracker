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
  

INSERT INTO employee (firts_name, last_name, role_id, manager_id)
VALUES ("Zahra", "Mammadli",2 , null ),
       ("Milhause", "Van Houten", 1, null),
       ("Homer","Simpson", 3, 2),
       ("Marge","Simpson",4, 1),
       ("Maggie" ,"Simpson", 5, 1),
       ("Bart","Simpson", 6, 2),
       ("Lisa", "Simpson",7, null),
       ("Montgomerry", "Berns", 8, null),       
       ("Principal", "Skinner", 9, 1),              
       ("Ned", "Flanders", 3, 1);
 
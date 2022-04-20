# CmpE-321-Project-3

## Authors

- Atilla Türkmen
- Onur Kömürcü

## Diagrams

[ER Diagram and schema](https://lucid.app/lucidchart/f27aa4db-048f-4fcf-9c62-b2c53b1234fe/edit)

## Setup

NodeJS and MySQL are required to run the server.

- After configuring the MySQL server, run `createTables.sql` file to create the tables. (can be run on MySQL Workbench)
- Copy the template.env file and rename the copy as '.env'.
- Write your MySQL password and username in .env.
- Change mysql port and database if they are different in your computer. The values in the template are default values and you probably don't need to change them.
- Run `npm install` to install required packages.
- Finally type `node server.js` to start the server.

## Requirements Progress

1. [X] DBM Login
2. [x] DBM Add User
3. [x] DBM Delete Student
4. [ ] DBM Update Instructor Title
5. [X] DBM View Students
6. [ ] DBM View Instructors
7. [ ] DBM View Student Grades
8. [ ] DBM View Courses of Instructor
9. [ ] DBM Grade Average of Course
10. [ ] Instructor Login
11. [ ] Instructor View Available Classroom
12. [ ] Instructor Add Course (**Trigger**)
13. [ ] Instructor Add Prerequisite
14. [ ] Instructor View Courses
15. [ ] Instructor View Students in Course
16. [ ] Instructor Update Course Name
17. [ ] Instructor Give Grade (**Trigger**)
18. [ ] Student List All Courses
19. [ ] Student Add Course
20. [ ] Student View Courses
21. [ ] Student Search Course
22. [ ] Student Filter Course (**Stored Procedure**)

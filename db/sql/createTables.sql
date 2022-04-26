-- Atilla Türkmen, Onur Kömürcü
-- Creates tables for 2. project of CmpE 321 course
-- Written for MYSQL

-- schema name
-- student id of Atilla and Onur to avoid name conflicts
CREATE DATABASE IF NOT EXISTS 2019400216_2018400147;
USE 2019400216_2018400147;

-- database manager limit is 4
-- it is enforced by a trigger
CREATE TABLE `Database_Manager` (
  `username` VARCHAR(250) NOT NULL, -- 250 is greatest varchar length that is indexable
  `password` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`username`)
);

CREATE TABLE `Department` (
  `department_id` VARCHAR(250) NOT NULL,
  `name` VARCHAR(250) NOT NULL UNIQUE,
  PRIMARY KEY (`department_id`)
);

CREATE TABLE `User` (
  `username` VARCHAR(250) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `surname` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `department_id` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`username`),
  FOREIGN KEY (`department_id`)
  REFERENCES `Department` (`department_id`)
);

CREATE TABLE `Instructor` (
  `username` VARCHAR(250) NOT NULL,
  `title` VARCHAR(250) NOT NULL,
  CONSTRAINT allowed_instructor_titles CHECK (title='Assistant Professor' OR title='Associate Professor' OR title='Professor'),
  PRIMARY KEY (`username`),
  FOREIGN KEY (`username`)
  REFERENCES `User` (`username`)
);

CREATE TABLE `Student` (
  `username` VARCHAR(250) NOT NULL,
  `student_id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `completed_credits` INT NOT NULL DEFAULT 0,
  `gpa` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`username`),
  FOREIGN KEY (`username`)
  REFERENCES `User` (`username`)
  ON DELETE CASCADE
);

CREATE TABLE `Classroom` (
  `classroom_id` VARCHAR(200) NOT NULL,
  `campus` VARCHAR(250) NOT NULL,
  `capacity` INT NOT NULL,
  PRIMARY KEY (`classroom_id`)
);

CREATE TABLE `Course` (
  `course_id` VARCHAR(250) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `credits` INT NOT NULL,
  `quota` INT NOT NULL,
  `slot` INT NOT NULL,
  `classroom_id` VARCHAR(200) NOT NULL, -- 200 instead of 250 for composite unique index
  `instructor_username` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`course_id`),
  FOREIGN KEY (`classroom_id`)
  REFERENCES `Classroom` (`classroom_id`),
  FOREIGN KEY (`instructor_username`)
  REFERENCES `Instructor` (`username`),
  UNIQUE KEY overlaps (`slot`,`classroom_id`),
  CONSTRAINT allowed_slots CHECK (slot>=1 AND slot<=10) -- slot can be from monday to friday
);

-- if grade is null, that means student is taking the course this semester
CREATE TABLE `Grades` (
  `student_id` INT NOT NULL,
  `course_id` VARCHAR(250) NOT NULL,
  `grade` FLOAT,
  PRIMARY KEY (`student_id`, `course_id`),
  FOREIGN KEY (`student_id`)
  REFERENCES `Student` (`student_id`)
  ON DELETE CASCADE,
  FOREIGN KEY (`course_id`)
  REFERENCES `Course` (`course_id`)
);

CREATE TABLE `Prerequisites` (
  `prq_for` VARCHAR(250) NOT NULL,
  `prq` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`prq_for`, `prq`),
  FOREIGN KEY (`prq_for`)
  REFERENCES `Course` (`course_id`),
  FOREIGN KEY (`prq`)
  REFERENCES `Course` (`course_id`),
  CONSTRAINT allowed_prerequisites CHECK (STRCMP(prq_for, prq)=1)
);

-- trigger for course quota
DELIMITER $$
CREATE TRIGGER Course_Quota
	BEFORE INSERT
    ON Grades FOR EACH ROW
BEGIN
	DECLARE nof_students INT;
    DECLARE quota INT;

    SELECT COUNT(*) 
    INTO nof_students
    FROM Grades G
    WHERE G.course_id=new.course_id;

    SELECT C.quota
    INTO quota
    FROM Course C
    WHERE C.course_id=new.course_id;
    
	IF nof_students >= quota THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = "Course quota is full!";
	END IF;
END$$
DELIMITER ;

-- trigger for classroom capacity check
DELIMITER $$
CREATE TRIGGER Classroom_Quota_Exceeded
	BEFORE INSERT
    ON Course FOR EACH ROW
BEGIN
    DECLARE classroom_capacity INT;

    SELECT C.capacity
    INTO classroom_capacity
    FROM Classroom C
    WHERE C.classroom_id=new.classroom_id;
    
	IF (classroom_capacity < new.quota) THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = "Course quota exceeds classroom capacity!";
	END IF;
END$$
DELIMITER ;

-- trigger for database manager limit
DELIMITER $$
CREATE TRIGGER Database_Manager_Limit
	BEFORE INSERT
    ON Database_Manager FOR EACH ROW
BEGIN
	DECLARE nof_managers INT;

    SELECT COUNT(*)
    INTO nof_managers
    FROM Database_Manager;

	IF nof_managers >= 4 THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = "There cannot be more than 4 database managers!";
	END IF;
END$$
DELIMITER ;

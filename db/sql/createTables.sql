-- Atilla Türkmen, Onur Kömürcü
-- Creates tables for 2. project of CmpE 321 course
-- Written for MYSQL

-- we couldn't limit row number in this table (limit should be 4)
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
  `student_id` VARCHAR(250) NOT NULL UNIQUE,
  `completed_courses` INT NOT NULL DEFAULT 0,
  `gpa` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`username`),
  FOREIGN KEY (`username`)
  REFERENCES `User` (`username`)
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
  `student_id` VARCHAR(250) NOT NULL,
  `course_id` VARCHAR(250) NOT NULL,
  `grade` FLOAT,
  PRIMARY KEY (`student_id`, `course_id`),
  FOREIGN KEY (`student_id`)
  REFERENCES `Student` (`student_id`),
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

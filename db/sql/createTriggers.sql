-- trigger for course quota
DROP TRIGGER IF EXISTS Course_Quota;
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
END;

-- trigger for classroom capacity check
DROP TRIGGER IF EXISTS Classroom_Quota_Exceeded;
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
END;

-- trigger for database manager limit
DROP TRIGGER IF EXISTS Database_Manager_Limit;
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
END;

-- trigger for updating gpa and completed credits of students
DROP TRIGGER IF EXISTS Student_Info_Update;
CREATE TRIGGER Student_Info_Update
	AFTER UPDATE
    ON Grades FOR EACH ROW
BEGIN
	-- get credit of course
	DECLARE credit_of_course INT;

  SELECT credits
  INTO credit_of_course
  FROM Course
  WHERE course_id=new.course_id;
  
  -- update gpa
  UPDATE Student
  SET gpa=(gpa*completed_credits+new.grade*credit_of_course)/(credit_of_course+completed_credits)
  WHERE student_id=new.student_id;
  
  -- update completed credits
	UPDATE Student
  SET completed_credits=completed_credits+credit_of_course
  WHERE student_id=new.student_id;
END;

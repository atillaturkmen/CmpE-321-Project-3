-- for finding courses by filter parameters
DROP PROCEDURE IF EXISTS filterCourses;
CREATE PROCEDURE filterCourses(IN department_id VARCHAR(250), campus VARCHAR(250), min_credits INT, max_credits INT)
BEGIN
    SELECT course_id, C.name AS course_name, credits, quota, slot, C.classroom_id, (CONCAT(U.name," ",surname)) AS instructor_full_name, campus, department_id 
	 FROM Course C 
	 JOIN Classroom CR ON CR.classroom_id=C.classroom_id
	 JOIN User U ON C.instructor_username=username
	 WHERE credits <= max_credits
	 AND credits >= min_credits
	 AND campus=campus
	 AND department_id=department_id;
END;

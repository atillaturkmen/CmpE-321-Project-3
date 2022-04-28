const db = require("../db/db-utils");

/**
 * Adds prerequisites array into course elements as "preq" field.
 * Changes courses parameter.
 * @param {*} courses array
 */
async function addPrerequisites(courses) {
    for (let course of courses){
        let preq = await db.getPreqs(course.course_id);
        course.preq = preq;
    }
}

module.exports = addPrerequisites;

import React from "react";
import { Course } from "./Planner-Interfaces/course";
import { Semester } from "./Planner-Interfaces/semester";

export function PreReqs({
    allSemesters,
    semester
}: {
    allSemesters: Semester[];
    semester: Semester;
}): JSX.Element {
    const failedPreReqs: string[] = []; //All the messages of prereqs that are not met in the semester
    //Checks a single course prereq to see if it is fullfilled
    function checkCoursePreReq(course: Course) {
        //If course has no prereq just return
        if (course.preReq === "") {
            return;
        }
        let pastCurrentSem = false;
        let foundPreReq = false;
        allSemesters.forEach((sem: Semester) => {
            if (sem.id === semester.id) {
                pastCurrentSem = true; //Set to true once you are at your semester as only semester prior to your semester can fullfill prereq
            }
            if (pastCurrentSem) {
                //Past or at your semester so don't check
                return;
            }
            //Check each courseId in the semester to see if it matches the prereq
            sem.courses.forEach((prevCourse: Course) => {
                if (course.preReq.search(prevCourse.courseId) !== -1) {
                    foundPreReq = true; //Becomes true if courseID matched the prereq
                }
            });
        });
        //If prereq wasn't found add it to the list
        if (!foundPreReq) {
            failedPreReqs.push(course.courseId + " requires " + course.preReq);
        }
    }
    //Go through each course in the semester and see if prereqs are met
    semester.courses.forEach((curCourse: Course) =>
        checkCoursePreReq(curCourse)
    );
    return (
        <div>
            {/*Return all missing prereq messages*/}
            {failedPreReqs.map((missingReq: string) => (
                <p key={missingReq}>{missingReq}</p>
            ))}
        </div>
    );
}

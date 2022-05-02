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
    const failedPreReqs: string[] = [];
    function checkCoursePreReq(course: Course) {
        if (course.preReq === "") {
            return;
        }
        let pastCurrentSem = false;
        let foundPreReq = false;
        allSemesters.forEach((sem: Semester) => {
            if (sem.id === semester.id) {
                pastCurrentSem = true;
            }
            if (pastCurrentSem) {
                return;
            }
            sem.courses.forEach((prevCourse: Course) => {
                if (course.preReq.search(prevCourse.courseId) !== -1) {
                    foundPreReq = true;
                }
            });
        });
        if (!foundPreReq) {
            failedPreReqs.push(course.courseId + " requires " + course.preReq);
        }
    }
    semester.courses.forEach((curCourse: Course) =>
        checkCoursePreReq(curCourse)
    );
    return (
        <div>
            {failedPreReqs.map((missingReq: string) => (
                <p key={missingReq}>{missingReq}</p>
            ))}
        </div>
    );
}

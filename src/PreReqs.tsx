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
    console.log(semester.courses);
    const failedPreReqs: string[] = [];
    function checkCoursePreReq(course: Course) {
        let pastCurrentSem = false;
        let foundPreReq = false;
        allSemesters.forEach((sem: Semester) => {
            if (sem.id === semester.id) {
                pastCurrentSem = true;
            }
            if (pastCurrentSem) {
                if (!foundPreReq) {
                    failedPreReqs.push(
                        course.courseId + " requires " + course.preReq
                    );
                }
                return;
            }
            sem.courses.forEach((prevCourse: Course) => {
                if (course.preReq.includes(prevCourse.courseId)) {
                    foundPreReq = true;
                }
            });
        });
        console.log(failedPreReqs);
    }
    semester.courses.forEach((curCourse: Course) =>
        checkCoursePreReq(curCourse)
    );
    return (
        <div>
            {failedPreReqs.map((missingReq: string) => (
                <span key={missingReq}>{missingReq}</span>
            ))}
        </div>
    );
}

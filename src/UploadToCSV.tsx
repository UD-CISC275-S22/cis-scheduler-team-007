import React, { useState } from "react";
import { Plan } from "./Planner-Interfaces/plan";
import { Course } from "./Planner-Interfaces/course";
import { Semester } from "./Planner-Interfaces/semester";

export function ExportToCSV({
    degreePlans
}: {
    degreePlans: Plan;
}): JSX.Element {
    const [planContent, setPlanContent] = useState<Plan>(degreePlans);
    function mapOutCourses() {
        const theCourses = planContent.semester.map((semester: Semester): Course[] => {
            return {semester.courses.map(
                (course: Course): string =>
                    course.id +
                    course.courseId +
                    String(course.credits) +
                    course.name +
                    course.preReq
            )};
        });
        return theCourses.flat();
    }

    /*`"${course.id}, ${course.name}, ${course.credits}, ${course.courseId}, ${course.preReq}"`*/
    const exclusiveContent = planContent.semester.map(
        (semester): string =>
            `${semester.id},
            ${semester.name},
            ${semester.year},
            ${semester.courses.map((course): string => {
        return `${course.id}, ${course.name}, ${course.credits}, ${course.courseId}, ${course.preReq}`;
            })},
            ${semester.season},
            ${semester.credits}`
    );
    const theCSV = exclusiveContent.join("\n");
    return <div></div>;
}

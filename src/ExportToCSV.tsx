import React, { useState } from "react";
import { Plan } from "./Planner-Interfaces/plan";
import { Course } from "./Planner-Interfaces/course";
import { Semester } from "./Planner-Interfaces/semester";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

export function ExportToCSV({ degreePlan }: { degreePlan: Plan }): JSX.Element {
    const [planContent, setPlanContent] = useState<Plan>(degreePlan);
    function mapOutCourses() {
        const theCourses = planContent.semesters.map(
            (semester: Semester): string => {
                return semester.courses
                    .map(
                        (course: Course): string =>
                            `${course.id} ${course.courseId} ${course.credits} ${course.name} ${course.preReq}`
                    )
                    .join("$");
            }
        );
        return theCourses;
    }

    /*`"${course.id}, ${course.name}, ${course.credits}, ${course.courseId}, ${course.preReq}"`*/
    const exclusiveContent = planContent.semesters.map(
        (semesters): string =>
            `${semesters.id},
            ${semesters.name},
            ${semesters.year},
            ${mapOutCourses()},
            ${semesters.season},
            ${semesters.credits}`
    );

    function download({ DegreePlan: Plan }, exclusiveContent, Plan) {
        const blobbed = new Blob([degreePlan], { type: Plan });
        const url = URL.createObjectURL(blobbed);

        let linkUp = document.createElement("a");
        linkUp = url;
        linkUp.setAttribute("download", exclusiveContent);
        linkUp.click();
    }

    const theCSV = exclusiveContent.join("\n");
    return (
        <div>
            <Button onClick={() => mapOutCourses()}>Export to CSV</Button>

        </div>
    );
}

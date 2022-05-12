import React, { useState } from "react";
import { Plan } from "./Planner-Interfaces/plan";
import { Course } from "./Planner-Interfaces/course";
import { Semester } from "./Planner-Interfaces/semester";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

export function ExportToCSV({ degreePlan }: { degreePlan: Plan }): JSX.Element {
    const [planContent] = useState<Plan>(degreePlan);
    function mapOutCourses() {
        const theCourses = planContent.semesters.map(
            (semester: Semester): string => {
                return semester.courses
                    .map(
                        (course: Course): string =>
                            `${course.id}, ${course.courseId}, ${course.credits}, ${course.name}, ${course.preReq}`
                    )
                    .join("$");
            }
        );
        return theCourses;
    }

    /*`"${course.id}, ${course.name}, ${course.credits}, ${course.courseId}, ${course.preReq}"`*/

    function download() {
        const exclusiveContent = planContent.semesters
            .map(
                (semesters): string =>
                    `${semesters.id},
                ${semesters.name},
                ${semesters.year},
                ${mapOutCourses()},
                ${semesters.season},
                ${semesters.credits}`
            )
            .join("\n");
        const blobbed = new Blob([exclusiveContent], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blobbed);
        const linkUp = document.createElement("a");
        linkUp.setAttribute("href", url);
        linkUp.setAttribute("download", exclusiveContent);
        linkUp.click();
    }
    function mapNDownload() {
        download();
    }
    return (
        <div>
            <CSVLink data={[degreePlan]}></CSVLink>
            <Button onClick={mapNDownload}>Export to CSV</Button>
        </div>
    );
}

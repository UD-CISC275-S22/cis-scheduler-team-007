import React from "react";
import { Plan } from "./Planner-Interfaces/plan";
import { Course } from "./Planner-Interfaces/course";
import { Semester } from "./Planner-Interfaces/semester";
import { CSVLink } from "react-csv";
/*Was able to follow a basic csv fucntion from the tasks, the tome and stack overflow but had a
really hard time getting it to download the file right and keep downloading a refrence instead*/

export function ExportToCSV({ degreePlan }: { degreePlan: Plan }): JSX.Element {
    function mapOutCourses() {
        const theCourses = degreePlan.semesters.map(
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
    const planToAString = mapOutCourses();

    /*`"${course.id}, ${course.name}, ${course.credits}, ${course.courseId}, ${course.preReq}"`*/

    function download() {
        const exclusiveContent = degreePlan.semesters
            .map(
                (semesters): string =>
                    `${semesters.id},
                ${semesters.name},
                ${semesters.year},
                ${mapOutCourses()},
                ${semesters.season}`
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
            <CSVLink
                data={planToAString[0]}
                filename={degreePlan.name + ".csv"}
                className="btn btn-primary"
                target="_blank"
                onClick={mapNDownload}
            >
                Download this plan as well
            </CSVLink>
        </div>
    );
}

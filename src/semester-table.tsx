import React from "react";
import { Course } from "./Planner-Interfaces/course";
import { Semester } from "./Planner-Interfaces/semester";

export function SemesterTable({
    currentSemester
}: {
    currentSemester: Semester;
}): JSX.Element {
    return (
        <div>
            <head></head>
            <table className="Table-Header">
                <tbody>
                    <tr>
                        <th>Course</th>
                        <th>Title</th>
                        <th>Credits</th>
                    </tr>
                    {currentSemester.courses.map((course: Course) => {
                        return (
                            <tr key={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.name}</td>
                                <td>{course.credits}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

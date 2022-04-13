import React from "react";
//import { Button, Table } from "react-bootstrap";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
//import { Semester } from "./Planner-Interfaces/semester";
/*
interface thisCourse {
    course: Course;
    remove_course: (num: number, str: string) => void;
}
*/
interface thisSemester {
    courses: Course[];
    semesterId: number;
    semList: Semester[];
    update: (semester: Semester[]) => void;
}
/*
function display_course({ course, remove_course }: thisCourse) {
    return (
        <tr>
            <td>
                <b>{course.name}:</b>
                {course.courseId}
            </td>
            <td>{course.credits}</td>
            <td>
                <button
                    onClick={() =>
                        remove_course(course.courseId as number, course.name)
                    }
                >
                    Remove Course
                </button>
            </td>
        </tr>
    );
}
*/
export function displaySemester({ courses }: thisSemester) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Courses</th>
                        <th>Credits</th>
                        <th>Edit Course</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course: Course) => {
                        return course;
                    })}
                </tbody>
            </table>
        </div>
    );
}

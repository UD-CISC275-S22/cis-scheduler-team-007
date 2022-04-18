import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
import Courses from "./CISC-Courses-data/ciscCourses.json";
import { DisplayCourse } from "./Course";

const compSciCourses = Courses.map(
    (course): Course => ({
        ...course,
        id: course.id,
        name: course.name,
        courseId: course.courseId,
        prereq: course.prereq
    })
);

interface thisSemester {
    courses: Course[];
    semesterId: number;
    semList: Semester[];
    update: (semester: Semester[]) => void;
}

export function DisplaySemester({ courses }: thisSemester): JSX.Element {
    const [currCourse, setCurrCourse] = useState<Course[]>(compSciCourses);
    function deleteCourse(id: string): void {
        setCurrCourse(
            currCourse.filter((course: Course): boolean => course.id !== id)
        );
    }
    function editCourse(id: string, aNewCourse: Course) {
        setCurrCourse(
            currCourse.map(
                (newCourse: Course): Course =>
                    newCourse.id === id ? aNewCourse : newCourse
            )
        );
    }
    function addCourse(aNewCourse: Course) {
        const currentCourse = currCourse.find(
            (course: Course): boolean => course.id === aNewCourse.id
        );
        if (currentCourse === undefined) {
            setCurrCourse([...currCourse, aNewCourse]);
        }
    }
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
                        return (
                            <DisplayCourse
                                existingCourse={course}
                                key={course.courseId}
                            ></DisplayCourse>
                        );
                    })}
                    <Button onClick={() => addCourse}>Add Course</Button>
                    <Button onClick={() => editCourse}>Edit Course</Button>
                    <Button onClick={() => deleteCourse}>Remove Course</Button>
                </tbody>
            </table>
        </div>
    );
}

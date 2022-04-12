import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import Courses from "./CISC-Courses-data/ciscCourses.json";
import { Button } from "react-bootstrap";

const compSciCourses = Courses.map(
    (course): Course => ({
        ...course,
        id: course.id,
        name: course.name,
        courseId: course.courseId,
        prereq: course.prereq
    })
);

export function ModifyCourse(): JSX.Element {
    const [course, setCourse] = useState<Course[]>(compSciCourses);

    function deleteCourse(id: string): void {
        setCourse(course.filter((course: Course): boolean => course.id !== id));
    }

    function editCourse(id: string, aNewCourse: Course) {
        setCourse(
            course.map(
                (newCourse: Course): Course =>
                    newCourse.id === id ? aNewCourse : newCourse
            )
        );
    }

    function addCourse(aNewCourse: Course) {
        const currentCourse = course.find(
            (course: Course): boolean => course.id === aNewCourse.id
        );
        if (currentCourse === undefined) {
            setCourse([...course, aNewCourse]);
        }
    }

    return (
        <div>
            <h1>
                Greetings CISC majors and minors, welcome to the UD CISC
                planner!
            </h1>
            <h2>
                You will see the selection of courses that you will choose down
                below
            </h2>
            <h2>
                You can either add, delete or modify a course with the help of
                each buttons
            </h2>
            <Button onClick={() => addCourse}>Add Course</Button>
            <Button onClick={() => deleteCourse}>Delete Course</Button>
            <Button onClick={() => editCourse}>Edit Course</Button>
        </div>
    );
}

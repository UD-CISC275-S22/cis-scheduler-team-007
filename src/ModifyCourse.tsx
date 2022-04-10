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
    return (
        <div>
            <Button onClick={() => deleteCourse}>Delete Course</Button>
            <Button onClick={() => editCourse}>Edit Course</Button>
        </div>
    );
}

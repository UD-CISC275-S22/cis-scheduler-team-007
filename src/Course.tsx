import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import Courses from "./CISC-Courses-data/ciscCourses.json";
import { Row, Col, Button } from "react-bootstrap";

const compSciCourses = Courses.map(
    (course): Course => ({
        ...course,
        id: course.id,
        name: course.name,
        courseId: course.courseId,
        prereq: course.prereq
    })
);

export function DisplayCourse({
    existingCourse
}: {
    existingCourse: Course;
}): JSX.Element {
    const [currCourse, setCurrCourse] = useState<Course[]>(compSciCourses);

    function editCourse(id: string, aNewCourse: Course) {
        setCurrCourse(
            currCourse.map(
                (newCourse: Course): Course =>
                    newCourse.id === id ? aNewCourse : newCourse
            )
        );
    }

    function deleteCourse(id: string): void {
        setCurrCourse(
            currCourse.filter((course: Course): boolean => course.id !== id)
        );
    }

    return (
        <div>
            <h1>Greetings CISC/INSY majors and minors</h1>
            <Row>
                <Col>{existingCourse.courseId}</Col>
                <Col>{existingCourse.name}</Col>
                <Col>{existingCourse.credits}</Col>
            </Row>
            <Button onClick={() => editCourse}>Edit Course</Button>
            <Button onClick={() => deleteCourse}>Remove Course</Button>
        </div>
    );
}

import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
import { DisplayCourse } from "./Course";
import { Plan } from "./Planner-Interfaces/plan";
import { makeId } from "./createId";

interface thisSemester {
    semester: Semester;
    plan: Plan;
    updatePlan: (plan: Plan) => void;
}

export function DisplaySemester({
    semester,
    plan,
    updatePlan
}: thisSemester): JSX.Element {
    function deleteCourse(id: string): void {
        const newCourses = semester.courses.filter(
            (course: Course): boolean => course.id !== id
        );
        const newSem = plan.semester.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, courses: newCourses }
                    : { ...sem }
        );
        updatePlan({ ...plan, semester: newSem });
    }
    function addCourse() {
        const newCourse = {
            id: makeId(),
            name: "New Course",
            credits: 0,
            courseId: "NEW",
            prereq: ""
        };
        const newSem = plan.semester.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, courses: [...sem.courses, newCourse] }
                    : { ...sem }
        );
        updatePlan({ ...plan, semester: newSem });
    }
    return (
        <div>
            <Row>
                <Col>Course ID</Col>
                <Col>Course Name</Col>
                <Col>Credits</Col>
                <Col>Edit Course</Col>
            </Row>
            {semester.courses.map((course: Course) => (
                <>
                    <DisplayCourse
                        existingCourse={course}
                        key={course.courseId}
                    ></DisplayCourse>
                    <Button onClick={() => deleteCourse(course.id)}>
                        Remove Course
                    </Button>
                </>
            ))}
            <Button onClick={() => addCourse()}>Add Course</Button>
        </div>
    );
}

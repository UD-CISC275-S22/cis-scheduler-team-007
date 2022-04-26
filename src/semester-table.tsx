import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
import { DisplayCourse } from "./Course";
import Courses from "./CISC-Courses-data/ciscCourses.json";
import { Plan } from "./Planner-Interfaces/plan";
import { makeId } from "./createId";

const ciscCourses = Courses.map(
    (course: Course): Course => ({
        ...course
    })
);

interface thisSemester {
    semester: Semester;
    plan: Plan;
    updatePlan: (plan: Plan) => void;
}

export function DisplaySemester(
    { semester, plan, updatePlan }: thisSemester,
    existingCourse: Course
): JSX.Element {
    const [isPreReq, setIsPreReq] = useState<boolean>(false);
    const [courseIdentity, setCourseIdentity] = useState<string>(
        existingCourse.courseId
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(existingCourse.credits);
    const [name, setName] = useState<string>(existingCourse.name);
    const [preReqCourse, setPreReqCourse] = useState<string>(
        ciscCourses[0].preReq
    );
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
    function addCourse(course: Course) {
        const newCourse = {
            id: makeId(),
            name: "New Course",
            credits: 0,
            courseId: "NEW",
            preReq: ""
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
                        credits={credits}
                        setCredits={setCredits}
                        name={name}
                        setName={setName}
                        preReqCourse={preReqCourse}
                        setPreReqCourse={setPreReqCourse}
                        courseIdentity={courseIdentity}
                        setCourseIdentity={setCourseIdentity}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        isPreReq={isPreReq}
                        setIsPreReq={setIsPreReq}
                    ></DisplayCourse>
                    <Button onClick={() => deleteCourse(course.id)}>
                        Remove Course
                    </Button>
                </>
            ))}
            <Button
                onClick={() =>
                    addCourse({
                        id: courseIdentity,
                        name: name,
                        credits: credits,
                        courseId: "",
                        preReq: preReqCourse
                    })
                }
            >
                Add Course
            </Button>
            <div>
                This is {isPreReq}, ? (you can take the course): (you can not
                take the course sorry!)
            </div>
        </div>
    );
}

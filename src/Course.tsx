import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import { Form } from "react-bootstrap";
import { Plan } from "./Planner-Interfaces/plan";
import { Semester } from "./Planner-Interfaces/semester";

export function DisplayCourse({
    existingCourse,
    semester,
    plan,
    updatePlan
}: {
    existingCourse: Course;
    semester: Semester;
    plan: Plan;
    updatePlan: (plan: Plan) => void;
}): JSX.Element {
    const [courseIdentity, setCourseIdentity] = useState<string>(
        existingCourse.courseId
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(existingCourse.credits);
    const [name, setName] = useState<string>(existingCourse.name);
    const [preReqs, setPreReqs] = useState<string>(existingCourse.preReq);

    function editCourse(course: Course) {
        const replace = semester.courses.findIndex(
            (course2: Course) => course2.id === course.id
        );
        const newCourses = [...semester.courses];
        newCourses.splice(replace, 1, course);
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, courses: newCourses }
                    : { ...sem }
        );
        updatePlan({ ...plan, semesters: newSem });
    }

    function updateCourseIdentity(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseIdentity(event.target.value);
    }

    function updatePreReq(event: React.ChangeEvent<HTMLInputElement>) {
        setPreReqs(event.target.value);
    }

    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
        editCourse({
            id: existingCourse.id,
            name: name,
            credits: credits,
            courseId: courseIdentity,
            preReq: preReqs
        });
    }

    function updateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function updateCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCredits(parseInt(event.target.value));
    }

    return (
        <>
            {isEditing ? (
                <>
                    <td>
                        <Form.Group className="mb-3" controlId="courseID">
                            <Form.Label>CourseID: </Form.Label>
                            <Form.Control
                                value={courseIdentity}
                                onChange={updateCourseIdentity}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Name of Course: </Form.Label>
                            <Form.Control
                                value={name}
                                onChange={updateCourseName}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group className="mb-3" controlId="courseCredits">
                            <Form.Label>Number of Credits: </Form.Label>
                            <Form.Control
                                type="number"
                                value={credits}
                                onChange={updateCredits}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group className="mb-3" controlId="coursePreReqs">
                            <Form.Label>PreReqs: </Form.Label>
                            <Form.Control
                                value={preReqs}
                                onChange={updatePreReq}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Check
                            type="checkbox"
                            id="is-editing-check"
                            checked={isEditing}
                            onChange={updateEditing}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{courseIdentity}</td>
                    <td>{name}</td>
                    <td>{credits}</td>
                    <td>
                        <Form.Check
                            type="checkbox"
                            id="is-editing-check"
                            checked={isEditing}
                            onChange={updateEditing}
                        />
                    </td>
                </>
            )}
        </>
    );
}

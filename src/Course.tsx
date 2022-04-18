import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import { Row, Col, Form } from "react-bootstrap";

export function DisplayCourse({
    existingCourse
}: {
    existingCourse: Course;
}): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [courseIdentity, setCourseIdentity] = useState<string>("");
    const [credits, setCredits] = useState<string>("1");
    const [name, setName] = useState<string>("");
    const otherCredits = parseInt(credits) - 1 || 0;
    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }

    function updateCourseIdentity(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseIdentity(event.target.value);
    }

    function updateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    return (
        <div>
            {isEditing ? (
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="courseID">
                            <Form.Label>CourseID</Form.Label>
                            <Form.Control
                                type={courseIdentity}
                                onChange={updateCourseIdentity}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>CourseCredits</Form.Label>
                            <Form.Control
                                type="Credits"
                                value={otherCredits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="courseCredits">
                            <Form.Label>CourseName</Form.Label>
                            <Form.Control
                                type={name}
                                onChange={updateCourseName}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col>{existingCourse.courseId}</Col>
                    <Col>{existingCourse.credits}</Col>
                    <Col>{existingCourse.name}</Col>
                </Row>
            )}
            <Form.Check
                type="checkbox"
                id="is-happy-check"
                label="Edit"
                checked={isEditing}
                onChange={updateEditing}
            />
        </div>
    );
}

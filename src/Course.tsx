import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import { Row, Col, Form } from "react-bootstrap";

export function DisplayCourse({
    existingCourse
}: {
    existingCourse: Course;
}): JSX.Element {
    const [courseIdentity, setCourseIdentity] = useState<string>(
        existingCourse.courseId
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(existingCourse.credits);
    const [name, setName] = useState<string>(existingCourse.name);

    function updateCourseIdentity(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseIdentity(event.target.value);
    }

    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }

    function updateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function updateCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCredits(parseInt(event.target.value));
    }

    return (
        <div>
            {isEditing ? (
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="courseID">
                            <Form.Label>CourseID: </Form.Label>
                            <Form.Control
                                value={courseIdentity}
                                onChange={updateCourseIdentity}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Name of Course: </Form.Label>
                            <Form.Control
                                value={name}
                                onChange={updateCourseName}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="courseCredits">
                            <Form.Label>Number of Credits: </Form.Label>
                            <Form.Control
                                type="number"
                                value={credits}
                                onChange={updateCredits}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            id="is-editing-check"
                            checked={isEditing}
                            onChange={updateEditing}
                        />
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col>{courseIdentity}</Col>
                    <Col>{name}</Col>
                    <Col>{credits}</Col>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            id="is-editing-check"
                            checked={isEditing}
                            onChange={updateEditing}
                        />
                    </Col>
                </Row>
            )}
        </div>
    );
}

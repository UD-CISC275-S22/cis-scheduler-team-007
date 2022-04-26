import React from "react";
import { Course } from "./Planner-Interfaces/course";
import { Row, Col, Form } from "react-bootstrap";

export function DisplayCourse({
    credits,
    setCredits,
    name,
    setName,
    preReqCourse,
    setPreReqCourse,
    setIsEditing,
    isEditing,
    courseIdentity,
    setCourseIdentity,
    isPreReq,
    setIsPreReq
}: {
    existingCourse: Course;
    isEditing: boolean;
    name: string;
    courseIdentity: string;
    credits: number;
    preReqCourse: string;
    isPreReq: boolean;
    setCredits: (credits: number) => void;
    setName: (name: string) => void;
    setPreReqCourse: (preReq: string) => void;
    setIsEditing: (editing: boolean) => void;
    setCourseIdentity: (courseIdentity: string) => void;
    setIsPreReq: (isPreReq: boolean) => void;
}): JSX.Element {
    function updatePreReqCourse(event: React.ChangeEvent<HTMLInputElement>) {
        setPreReqCourse(event.target.value);
    }

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

    function updateIsPreReq(event: React.ChangeEvent<HTMLInputElement>) {
        setIsPreReq(event.target.checked);
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
                        <Form.Group className="mb-3" controlId="courseCredits">
                            <Form.Label>Prerequsite: </Form.Label>
                            <Form.Control
                                value={preReqCourse}
                                onChange={updatePreReqCourse}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            id="is-editing-check"
                            checked={isPreReq}
                            onChange={updateIsPreReq}
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

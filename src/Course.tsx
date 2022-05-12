import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import { Button, Form } from "react-bootstrap";
import { Plan } from "./Planner-Interfaces/plan";
import { Semester } from "./Planner-Interfaces/semester";
import classesExamples from "./CISC-Courses-data/catalog.json";

const courseList = classesExamples.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: parseInt(course.credits),
        courseId: course.id,
        preReq: course.prereqs
    })
);

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
        const newCourse = courseList.findIndex(
            (course: Course) => course.id === event.target.value
        );
        setCourseIdentity(event.target.value);
        setCredits(courseList[newCourse].credits);
        setName(courseList[newCourse].name);
        setPreReqs(courseList[newCourse].preReq);
    }

    function updateEditing() {
        setIsEditing(false);
        editCourse({
            id: existingCourse.id,
            name: name,
            credits: credits,
            courseId: courseIdentity,
            preReq: preReqs
        });
    }

    function cancelEdit() {
        setIsEditing(false);
        setCourseIdentity(existingCourse.courseId);
        setCredits(existingCourse.credits);
        setName(existingCourse.name);
        setPreReqs(existingCourse.preReq);
    }

    function updateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function updateCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCredits(parseInt(event.target.value));
    }
    function updatePreReqs(event: React.ChangeEvent<HTMLInputElement>) {
        setPreReqs(event.target.value);
    }

    return (
        <>
            {isEditing ? (
                <>
                    <td>
                        <Form.Group className="mb-3" id="courseID">
                            <datalist id="courseIDs">
                                {courseList.map(
                                    (
                                        course: Course //will need to change to course.courseID
                                    ) => (
                                        <option key={course.id}>
                                            {course.id}
                                        </option>
                                    )
                                )}
                            </datalist>
                            <Form.Label htmlFor="courseID">
                                CourseID:{" "}
                            </Form.Label>
                            <Form.Control
                                list="courseIDs"
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
                                onChange={updatePreReqs}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <Button onClick={updateEditing} className="btn">
                            Save Changes
                        </Button>
                        <br></br>
                        <Button onClick={cancelEdit} className="btn">
                            Cancel
                        </Button>
                    </td>
                </>
            ) : (
                <>
                    <td>{courseIdentity}</td>
                    <td>{name}</td>
                    <td>{credits}</td>
                    <td>
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="btn"
                        >
                            Edit Course
                        </Button>
                    </td>
                </>
            )}
        </>
    );
}

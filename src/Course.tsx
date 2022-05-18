import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import { Button, Form } from "react-bootstrap";
import { Plan } from "./Planner-Interfaces/plan";
import { Semester } from "./Planner-Interfaces/semester";
import classesExamples from "./CISC-Courses-data/catalog.json";

//All the courses that can be used to autofill
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
    //for editing courseID
    const [courseIdentity, setCourseIdentity] = useState<string>(
        existingCourse.courseId
    );
    const [isEditing, setIsEditing] = useState<boolean>(false); //If editing course info or not
    const [credits, setCredits] = useState<number>(existingCourse.credits); //Credit editing
    const [name, setName] = useState<string>(existingCourse.name); //name editing
    const [preReqs, setPreReqs] = useState<string>(existingCourse.preReq); //PreReq editing

    //Saves changes made to course all the way to Plan
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

    //Updates info based on autofill choice
    function updateCourseIdentity(event: React.ChangeEvent<HTMLInputElement>) {
        const newCourse = courseList.findIndex(
            (course: Course) => course.id === event.target.value
        );
        setCourseIdentity(event.target.value);
        setCredits(courseList[newCourse].credits);
        setName(courseList[newCourse].name);
        setPreReqs(courseList[newCourse].preReq);
    }

    //Called if save changes selected when editing (will save changes)
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

    //Called if cancel clicked when editing (won't save changes)
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
            {isEditing ? ( //If editing displays textboxes and 2 buttons to allow for edits to the course to be made
                <>
                    <td>
                        <Form.Group className="mb-3" id="courseID">
                            <datalist id="courseIDs">
                                {courseList.map((course: Course) => (
                                    <option key={course.id}>{course.id}</option>
                                ))}
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
                        <Button onClick={updateEditing} className="btnadd">
                            Save Changes
                        </Button>
                        <br></br>
                        <Button onClick={cancelEdit} className="btncancel">
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

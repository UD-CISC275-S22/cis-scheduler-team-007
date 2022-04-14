import React, { useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
import { Plan } from "./Planner-Interfaces/plan";
import { makeId } from "./createId";
import { Form } from "react-bootstrap";
import { DisplayCourse } from "./Course";
import classesExamples from "./CISC-Courses-data/catalog.json";
interface thisSemester {
    semester: Semester;
    plan: Plan;
    updatePlan: (plan: Plan) => void;
}
//Pool of available autofilled courses
const courseList = classesExamples.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: parseInt(course.credits),
        courseId: course.id,
        preReq: course.prereqs
    })
);
export function DisplaySemester({
    semester,
    plan,
    updatePlan
}: thisSemester): JSX.Element {
    //For the modal for adding courses
    const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    const [edit, setEdit] = useState<boolean>(false); //For editing semester name
    const [courseIdentity, setCourseIdentity] = useState<string>(""); //For adding coruses
    const [credits, setCredits] = useState<number>(0); //For adding courses
    const [name, setName] = useState<string>(""); //For adding courses
    const [preReq, setPreReq] = useState<string>(""); //For adding courses
    //Deletes course with given id, and updates plan with deletion
    function deleteCourse(id: string): void {
        const newCourses = semester.courses.filter(
            (course: Course): boolean => course.id !== id
        );
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, courses: newCourses }
                    : { ...sem }
        );
        updatePlan({ ...plan, semesters: newSem });
    }

    //Deletes all courses in a semester by setting courses to an empty list in the correct semseter
    function removeAllCourses() {
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id ? { ...sem, courses: [] } : { ...sem }
        );
        updatePlan({ ...plan, semesters: newSem });
    }
    //Updates the states for the course to be added
    function updateCourseIdentity(event: React.ChangeEvent<HTMLInputElement>) {
        const newCourse = courseList.findIndex(
            (course: Course) => course.id === event.target.value
        );
        if (newCourse === -1) {
            //If not in the pool of courses use null values for other info
            setCourseIdentity(event.target.value);
            setCredits(0);
            setName("");
            setPreReq("");
        } else {
            //If found in pool of courses use values found
            setCourseIdentity(event.target.value);
            setCredits(courseList[newCourse].credits);
            setName(courseList[newCourse].name);
            setPreReq(courseList[newCourse].preReq);
        }
    }
    //Modal for adding a course
    function chooseCourse(): JSX.Element {
        return (
            <div className=".app">
                <Button
                    className="btnadd"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    type="button"
                    onClick={toggleModal}
                >
                    Add Course
                </Button>
                <Modal
                    id="#mymodal"
                    show={isOpen}
                    animation={false}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                >
                    <Form.Group className="mb-3" id="courseID">
                        <datalist id="courseIDs">
                            {courseList.map((course: Course) => (
                                <option key={course.id}>{course.id}</option>
                            ))}
                            ;
                        </datalist>
                        <Form.Label
                            placeholder="Enter Course ID"
                            htmlFor="courseID"
                        >
                            Please Enter The Course ID, Then Click on The Course
                            From the Dropdown:
                        </Form.Label>
                        <Form.Control
                            list="courseIDs"
                            value={courseIdentity}
                            onChange={updateCourseIdentity}
                        />
                    </Form.Group>
                    <ModalFooter>
                        <div>
                            <Button
                                className="btnadd"
                                type="submit"
                                onClick={addCourse}
                            >
                                Add Course
                            </Button>

                            <Button
                                className="btncancel"
                                type="button"
                                onClick={toggleModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    //Adds the course to the end of the semester with the current states
    function addCourse() {
        const newCourse = {
            id: makeId(),
            name: name,
            credits: credits,
            courseId: courseIdentity,
            preReq: ""
        };
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, courses: [...sem.courses, newCourse] }
                    : { ...sem }
        );
        updatePlan({ ...plan, semesters: newSem });
        toggleModal();
        setCourseIdentity("");
        setCredits(0);
        setName("");
    }
    //Edits the name of the semester
    function editSemName(event: React.ChangeEvent<HTMLInputElement>) {
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, name: event.target.value }
                    : { ...sem }
        );
        updatePlan({ ...plan, semesters: newSem });
    }
    return (
        <>
            <div>
                <select>
                    <option>Summer</option>
                    <option>Fall</option>
                    <option>Winter</option>
                    <option>Spring</option>
                </select>
                <select>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                </select>
            </div>
            <table className="Table-Header">
                {edit ? (
                    <div>
                        <Form.Group
                            className="dropdownWidth"
                            controlId="semName"
                        >
                            <Form.Label>Name of Semester: </Form.Label>
                            <Form.Control
                                value={semester.name}
                                onChange={editSemName}
                            />
                        </Form.Group>
                        <Button onClick={() => setEdit(false)}>
                            Stop Editing
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h4>
                            {semester.name}{" "}
                            <button
                                className="btntransparent"
                                onClick={() => setEdit(true)}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                                    height="40"
                                    width="40"
                                />
                            </button>
                        </h4>
                    </div>
                )}
                <tr>
                    <th>Course</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Edit Course</th>
                    <th>Delete Course</th>
                </tr>
                {semester.courses.map((course: Course) => {
                    return (
                        <tr key={course.id}>
                            <DisplayCourse
                                existingCourse={course}
                                semester={semester}
                                plan={plan}
                                updatePlan={updatePlan}
                            ></DisplayCourse>
                            <td>
                                <Button
                                    className="btncancel"
                                    onClick={() => deleteCourse(course.id)}
                                >
                                    Remove Course
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                {chooseCourse()}
                <Button
                    className="btncancel"
                    onClick={() => removeAllCourses()}
                >
                    Remove All Courses
                </Button>
            </table>
        </>
    );
}

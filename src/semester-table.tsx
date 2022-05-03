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
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const [courseIdentity, setCourseIdentity] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [preReq, setPreReq] = useState<string>("");
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

    function removeAllCourses() {
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id ? { ...sem, courses: [] } : { ...sem }
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
        setPreReq(courseList[newCourse].preReq);
    }
    function chooseCourse(): JSX.Element {
        return (
            <div className=".btn">
                <Button
                    className=".btn"
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
                            {courseList.map(
                                (
                                    course: Course //will need to change to course.courseID
                                ) => (
                                    <option key={course.id}>{course.id}</option>
                                )
                            )}
                            ;
                        </datalist>
                        <Form.Label
                            placeholder="Enter Course ID"
                            htmlFor="courseID"
                        >
                            CourseID:{" "}
                        </Form.Label>
                        <Form.Control
                            list="courseIDs"
                            value={courseIdentity}
                            onChange={updateCourseIdentity}
                        />
                    </Form.Group>
                    <ModalFooter>
                        <div className="modal-footer">
                            <Button type="submit" onClick={addCourse}>
                                Add Course
                            </Button>

                            <Button type="button" onClick={toggleModal}>
                                Cancel
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    function addCourse() {
        const newCourse = {
            id: makeId(),
            name: name,
            credits: credits,
            courseId: courseIdentity,
            preReq: preReq
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
                <tr>
                    <th>Course</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Edit Course</th>
                    <th>Delete Course</th>
                    <th>Reset Course</th>
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
                                <Button onClick={() => deleteCourse(course.id)}>
                                    Remove Course
                                </Button>
                            </td>
                            <td>
                                <Button onClick={() => updateCourseIdentity}>
                                    Reset Course
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                {chooseCourse()}
                <Button onClick={() => removeAllCourses()}>
                    Remove All Courses
                </Button>
            </table>
        </>
    );
}

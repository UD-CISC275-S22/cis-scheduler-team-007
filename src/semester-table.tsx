import React from "react";
import { Button } from "react-bootstrap";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
import { Plan } from "./Planner-Interfaces/plan";
import { makeId } from "./createId";
import { DisplayCourse } from "./Course";
import { PreReqs } from "./PreReqs";

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
    function addCourse() {
        const newCourses = {
            id: makeId(),
            name: "New Course",
            credits: 0,
            courseId: "NEW",
            preReq: ""
        };
        const newSem = plan.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id
                    ? { ...sem, courses: [...sem.courses, newCourses] }
                    : { ...sem }
        );
        updatePlan({ ...plan, semesters: newSem });
    }
    return (
        <table className="Table-Header">
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
                            <Button onClick={() => deleteCourse(course.id)}>
                                Remove Course
                            </Button>
                        </td>
                    </tr>
                );
            })}
            <Button onClick={() => addCourse()}> Add Course</Button>
            <Button onClick={() => removeAllCourses()}>
                Remove All Courses
            </Button>
            <PreReqs
                allSemesters={plan.semesters}
                semester={semester}
            ></PreReqs>
        </table>
    );
}

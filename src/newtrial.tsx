import React from "react";
import { Semester } from "./Planner-Interfaces/semester";
import { Course } from "./Planner-Interfaces/course";
import { Button } from "react-bootstrap";
import { Plan } from "./Planner-Interfaces/plan";

interface thisSemester {
    semester: Semester;
    plan: Plan;
    updatePlan: (plan: Plan) => void;
    currentSemester: Semester;
}

export function SemesterTable({
    currentSemester,
    updatePlan,
    semester,
    plan
}: thisSemester): JSX.Element {
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
    return (
        <table className="Table-Header">
            <tr>
                <th>Course</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Delete Course</th>
            </tr>
            {currentSemester.courses.map((course: Course) => {
                return (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.credits}</td>
                        <td>
                            <Button onClick={() => deleteCourse(course.id)}>
                                Remove Course
                            </Button>
                        </td>
                    </tr>
                );
            })}
        </table>
    );
}

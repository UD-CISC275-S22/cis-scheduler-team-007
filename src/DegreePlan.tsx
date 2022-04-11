import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "./Planner-Interfaces/plan";
import { Semester } from "./Planner-Interfaces/semester";

export function DegreePlan(): JSX.Element {
    const [plan, setPlan] = useState<Plan>({
        id: "1",
        name: "Test",
        semester: [],
        requiredCourses: []
    });
    function insertSemester(id: string) {
        const newSemesters = plan.semester;
        const insertIndex =
            newSemesters.findIndex((semester: Semester) => semester.id === id) +
            1;
        newSemesters.splice(insertIndex, 0, {
            id: "I dont know",
            name: "",
            year: plan.semester[insertIndex - 1].year,
            courses: [],
            season: "",
            credits: 0
        });
        setPlan({ ...plan, semester: newSemesters });
    }
    function deleteSemester(id: string){
        const newSemesters = plan.semester;
        newSemesters.splice(
            newSemesters.findIndex((semester: Semester) => semester.id === id),
            1
        );
        setPlan({ ...plan, semester: newSemesters });
    }
    return (
        <div>
            <h4>{plan.name}</h4>
            {plan.semester.map((semester: Semester) => (
                <div key={semester.id}>
                    <p>Semester Component goes here</p>
                    <Button onClick={() => insertSemester(semester.id)}>
                        Insert Semester
                    </Button>
                    <Button onClick={() => deleteSemester(semester.id)}>
                        Delete Semester
                    </Button>
                </div>
            ))}
        </div>
    );
}

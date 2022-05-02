import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { makeId } from "./createId";
import { DegreeRequirements_Section } from "./degree";
import { Plan } from "./Planner-Interfaces/plan";
import { Semester } from "./Planner-Interfaces/semester";
import { DisplaySemester } from "./semester-table";

export function DegreePlan({
    degreePlans,
    setDegreePlans,
    currentPlan,
    saveData
}: {
    degreePlans: Plan[];
    setDegreePlans: (newDegreePlans: Plan[]) => void;
    currentPlan: Plan;
    saveData: () => void;
}): JSX.Element {
    saveData();
    const [DegreeReq_View_State, toggleDegreeReqView] = useState(false);
    const [plan, setPlan] = useState<Plan>(currentPlan);
    function insertSemester(id: string) {
        const newSemesters = plan.semesters;
        const insertIndex =
            newSemesters.findIndex((semester: Semester) => semester.id === id) +
            1;
        newSemesters.splice(insertIndex, 0, {
            id: makeId(),
            name: "Copy of " + plan.semesters[insertIndex - 1].name,
            year: plan.semesters[insertIndex - 1].year,
            courses: [],
            season: "",
            credits: 0
        });
        setPlan({ ...plan, semesters: newSemesters });
    }
    function deleteSemester(id: string) {
        const newSemesters = plan.semesters;
        newSemesters.splice(
            newSemesters.findIndex((semester: Semester) => semester.id === id),
            1
        );
        setPlan({ ...plan, semesters: newSemesters });
    }
    function saveChanges() {
        const replaceIndex = degreePlans.findIndex(
            (current: Plan) => current.id === plan.id
        );
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(replaceIndex, 1, plan);
        setDegreePlans(newDegreePlans);
    }
    function clearAllSemesters() {
        setPlan({ ...plan, semesters: [] });
    }
    function addSemester() {
        setPlan({
            ...plan,
            semesters: [
                ...plan.semesters,
                {
                    id: makeId(),
                    name: "Fall",
                    year: 2022,
                    courses: [],
                    season: "",
                    credits: 0
                }
            ]
        });
    }
    return (
        <div>
            <h1>{plan.name}</h1>
            {plan.semesters.map((semester: Semester) => (
                <div key={semester.id}>
                    <DisplaySemester
                        semester={semester}
                        plan={plan}
                        updatePlan={setPlan}
                    ></DisplaySemester>
                    <Button onClick={() => insertSemester(semester.id)}>
                        Insert New Semester
                    </Button>
                    <Button onClick={() => deleteSemester(semester.id)}>
                        Delete This Semester
                    </Button>
                </div>
            ))}
            <Button onClick={() => addSemester()}>Add Semester</Button>
            <Button onClick={() => saveChanges()}>Save Plan Changes</Button>
            <Button onClick={() => clearAllSemesters()}>
                Delete All Semesters
            </Button>
            <br></br>
            <DegreeRequirements_Section
                show={DegreeReq_View_State}
                setShow={toggleDegreeReqView}
                userSemesters={plan.semesters}
            ></DegreeRequirements_Section>
        </div>
    );
}

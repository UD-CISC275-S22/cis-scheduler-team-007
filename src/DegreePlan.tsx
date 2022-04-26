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
    currentPlan
}: {
    degreePlans: Plan[];
    setDegreePlans: (newDegreePlans: Plan[]) => void;
    currentPlan: Plan;
}): JSX.Element {
    const [DegreeReq_View_State, toggleDegreeReqView] = useState(false);
    //const [app_Content_Width, setAppContentWidth] = useState(100);
    const [plan, setPlan] = useState<Plan>(currentPlan);
    function insertSemester(id: string) {
        const newSemesters = plan.semester;
        const insertIndex =
            newSemesters.findIndex((semester: Semester) => semester.id === id) +
            1;
        newSemesters.splice(insertIndex, 0, {
            id: makeId(),
            name: "Copy of " + plan.semester[insertIndex - 1].name,
            year: plan.semester[insertIndex - 1].year,
            courses: [],
            season: "",
            credits: 0
        });
        setPlan({ ...plan, semester: newSemesters });
    }
    function deleteSemester(id: string) {
        const newSemesters = plan.semester;
        newSemesters.splice(
            newSemesters.findIndex((semester: Semester) => semester.id === id),
            1
        );
        setPlan({ ...plan, semester: newSemesters });
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
        setPlan({ ...plan, semester: [] });
    }
    function addSemester() {
        setPlan({
            ...plan,
            semester: [
                ...plan.semester,
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
            <h4>{plan.name}</h4>
            {plan.semester.map((semester: Semester) => (
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

            <DegreeRequirements_Section
                show={DegreeReq_View_State}
                setShow={toggleDegreeReqView}
                userSemesters={plan.semester}
            ></DegreeRequirements_Section>
        </div>
    );
}

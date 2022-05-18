import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { makeId } from "./createId";
import { DegreeRequirements_Section } from "./degree";
import { Plan } from "./Planner-Interfaces/plan";
import { Semester } from "./Planner-Interfaces/semester";
import { DisplaySemester } from "./SemesterTable";

export function DegreePlan({
    degreePlans,
    setDegreePlans,
    currentPlan
}: {
    degreePlans: Plan[];
    setDegreePlans: (newDegreePlans: Plan[]) => void;
    currentPlan: Plan;
}): JSX.Element {
    const [degreeReqView, toggleDegreeReqView] = useState(false); //For viewing degree Requirement
    const [plan, setPlan] = useState<Plan>({ ...currentPlan }); //Copy of selected plan that can override said plan with the save button
    const [edit, setEdit] = useState<boolean>(false); //Ability to edit the name of the plan
    //Inserts a semester in seleccted plan
    function insertSemester(id: string) {
        const newSemesters = [...plan.semesters];
        const insertIndex =
            newSemesters.findIndex((semester: Semester) => semester.id === id) +
            1; //Finding where to insert the new semester
        newSemesters.splice(insertIndex, 0, {
            id: makeId(),
            name: "Copy of " + plan.semesters[insertIndex - 1].name,
            year: plan.semesters[insertIndex - 1].year,
            courses: [],
            season: ""
        }); //Putting the new semester in the plan
        setPlan({ ...plan, semesters: newSemesters }); //Updating plan
    }
    //Deletes chosen semester
    function deleteSemester(id: string) {
        const newSemesters = [...plan.semesters];
        newSemesters.splice(
            newSemesters.findIndex((semester: Semester) => semester.id === id),
            1
        ); //Removes plan by id
        setPlan({ ...plan, semesters: newSemesters }); //Updating plan
    }
    //Saves changes made to plan into the state of the list of plans in App
    function saveChanges() {
        const replaceIndex = degreePlans.findIndex(
            (current: Plan) => current.id === plan.id
        ); //Finds where the plan we have a copy of is
        const newDegreePlans = [...degreePlans]; //Makes a copy of the old list of plans
        newDegreePlans.splice(replaceIndex, 1, plan); //Replaces the old plan in the list with our local version
        setDegreePlans(newDegreePlans); //Updates the list of plans in App
    }
    //Deletes all semester of a plan by setting semester to an empty list
    function clearAllSemesters() {
        setPlan({ ...plan, semesters: [] });
    }
    //Adds a semester to the end of the semester list
    function addSemester() {
        setPlan({
            ...plan,
            semesters: [
                ...plan.semesters,
                {
                    id: makeId(),
                    name: "New Semester",
                    year: 2022,
                    courses: [],
                    season: ""
                }
            ]
        });
    }
    //Updates the name of a plan
    function editPlanName(event: React.ChangeEvent<HTMLInputElement>) {
        setPlan({ ...plan, name: event.target.value });
    }
    return (
        <div>
            {edit ? ( //Checks if you are editing if so displays textbox to change name, if not displays plan name with button to edit
                <div>
                    <Form.Group className="dropdownWidth" controlId="planName">
                        <Form.Label>Name of Plan: </Form.Label>
                        <Form.Control
                            value={plan.name}
                            onChange={editPlanName}
                        />
                    </Form.Group>
                    <Button onClick={() => setEdit(false)} className="btn">
                        Stop Editing
                    </Button>
                </div>
            ) : (
                <div>
                    <h1>
                        {plan.name}{" "}
                        <button
                            onClick={() => setEdit(true)}
                            className="btntransparent"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                                height="40"
                                width="40"
                            />
                        </button>
                    </h1>
                </div>
            )}
            {plan.semesters.map((semester: Semester) => (
                <div key={semester.id}>
                    <DegreeRequirements_Section
                        show={degreeReqView}
                        setShow={toggleDegreeReqView}
                        userSemesters={plan.semesters}
                    ></DegreeRequirements_Section>
                    <DisplaySemester
                        semester={semester}
                        plan={plan}
                        updatePlan={setPlan}
                    ></DisplaySemester>
                    <Button
                        className="btnadd"
                        onClick={() => insertSemester(semester.id)}
                    >
                        Insert New Semester
                    </Button>
                    <Button
                        className="btncancel"
                        onClick={() => deleteSemester(semester.id)}
                    >
                        Delete This Semester
                    </Button>
                </div>
            ))}
            <Button className="btnadd" onClick={() => addSemester()}>
                Add Semester
            </Button>
            <Button className="btnadd" onClick={() => saveChanges()}>
                Save Plan Changes
            </Button>
            <Button className="btncancel" onClick={() => clearAllSemesters()}>
                Delete All Semesters
            </Button>
            <br></br>
        </div>
    );
}

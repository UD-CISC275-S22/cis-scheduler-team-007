import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import { makeId } from "./createId";
import { DegreePlan } from "./DegreePlan";
import { Plan } from "./Planner-Interfaces/plan";

let defaultPlans = [
    {
        id: "Special",
        name: "No Plan Selected",
        semesters: [],
        requiredCourses: []
    },
    {
        id: "1",
        name: "Test1",
        semesters: [
            {
                id: makeId(),
                name: "Test Sem",
                year: 2020,
                courses: [
                    {
                        id: makeId(),
                        name: "Test",
                        credits: 125,
                        courseId: "CISC 108",
                        preReq: "THIS COURSE"
                    }
                ],
                season: "",
                credits: 0
            }
        ],
        requiredCourses: []
    },
    {
        id: "2",
        name: "Test2",
        semesters: [
            {
                id: makeId(),
                name: "Test Sem",
                year: 2020,
                courses: [
                    {
                        id: makeId(),
                        name: "Test",
                        credits: 123,
                        courseId: "CISC 108",
                        preReq: ""
                    }
                ],
                season: "",
                credits: 0
            }
        ],
        requiredCourses: []
    }
];
const saveDataKey = "CISC-DEGREE-PLANNER-DATA";
// Check if the user's data already exists
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    defaultPlans = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Plan[]>(defaultPlans);
    const [selectedPlan, setSelectedPlan] = useState<Plan>(degreePlans[0]);
    function updateSelectedPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPlan(
            degreePlans[
                degreePlans.findIndex(
                    (plan: Plan) => plan.id === event.target.value
                )
            ]
        );
    }
    function saveData() {
        localStorage.setItem(saveDataKey, JSON.stringify(degreePlans));
    }
    function addPlan() {
        const newPlan = {
            id: makeId(),
            name: "New Plan",
            semesters: [],
            requiredCourses: []
        };
        setDegreePlans([...degreePlans, newPlan]);
        setSelectedPlan(newPlan);
    }
    function deletePlan() {
        if (selectedPlan.id === "Special") {
            return;
        }
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(
            degreePlans.findIndex((plan: Plan) => plan.id === selectedPlan.id),
            1
        );
        setDegreePlans(newDegreePlans);
        setSelectedPlan(degreePlans[0]);
    }

    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>By: Eric Toreki, Maxwell Wang, Joshua Strassle</p>
            <div>
                Hello CISC or INSY majors and minors
                <br />
                Currently our advising department is unfortunaley busy but we
                will do our best to help with choosing a great plan to fit your
                scheldule so that you can graduate on time!
                <br />
                In here you can choose a plan for your cisc degree.
            </div>
            <Form.Group controlId="userPlans">
                <Form.Label>Select Degree Plan:</Form.Label>
                <Form.Select
                    value={selectedPlan?.id}
                    onChange={updateSelectedPlan}
                >
                    {degreePlans.map((plan: Plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button onClick={addPlan} className="btn">
                Add New Plan
            </Button>
            <Button onClick={deletePlan}>Delete Selected Plan</Button>
            {selectedPlan.id !== "Special" ? (
                <DegreePlan
                    key={selectedPlan.id}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                    currentPlan={selectedPlan}
                    saveData={saveData}
                ></DegreePlan>
            ) : (
                <h4>No Plan Selected</h4>
            )}
        </div>
    );
}

export default App;

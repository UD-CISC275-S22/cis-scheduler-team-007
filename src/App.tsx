import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import { makeId } from "./createId";
import { DegreePlan } from "./DegreePlan";
import { Plan } from "./Planner-Interfaces/plan";
import DefaultPlans from "./Plans/DefaultPlans.json";

let defaulted = DefaultPlans.defaultPlans.map(
    (plan: Plan): Plan => ({ ...plan, id: makeId() })
);
const saveDataKey = "CISC-DEGREE-PLANNER-DATA";
// Check if the user's data already exists
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    defaulted = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Plan[]>(defaulted);
    const [selectedPlan, setSelectedPlan] = useState<number>(1);
    function updateSelectedPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPlan(
            degreePlans.findIndex(
                (plan: Plan) => plan.id === event.target.value
            )
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
        setSelectedPlan(degreePlans.length - 1);
    }
    function deletePlan() {
        if (degreePlans[selectedPlan].id === "Special") {
            return;
        }
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(
            degreePlans.findIndex(
                (plan: Plan) => plan.id === degreePlans[selectedPlan].id
            ),
            1
        );
        setDegreePlans(newDegreePlans);
        setSelectedPlan(0);
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
                    value={degreePlans[selectedPlan].id}
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
            {degreePlans[selectedPlan].id !== "Special" ? (
                <DegreePlan
                    key={degreePlans[selectedPlan].id}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                    currentPlan={degreePlans[selectedPlan]}
                    saveData={saveData}
                ></DegreePlan>
            ) : (
                <h4>No Plan Selected</h4>
            )}
        </div>
    );
}

export default App;

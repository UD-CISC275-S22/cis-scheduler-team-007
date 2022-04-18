import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import { makeId } from "./createId";
import { DegreePlan } from "./DegreePlan";
import { Plan } from "./Planner-Interfaces/plan";

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Plan[]>([
        { id: "1", name: "Test1", semester: [], requiredCourses: [] },
        { id: "2", name: "Test2", semester: [], requiredCourses: [] }
    ]);
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
    function addPlan() {
        setDegreePlans([
            ...degreePlans,
            {
                id: makeId(),
                name: "New Plan",
                semester: [],
                requiredCourses: []
            }
        ]);
    }
    function deletePlan() {
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(
            degreePlans.findIndex((plan: Plan) => plan.id === selectedPlan.id),
            1
        );
        setDegreePlans(newDegreePlans);
        setSelectedPlan({
            id: "",
            name: "",
            semester: [],
            requiredCourses: []
        });
    }
    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>By: Eric Toreki, Maxwell Wang, Joshua Strassle</p>
            <Form.Group controlId="userEmotions">
                <Form.Label>Selected Degree Plan:</Form.Label>
                <Form.Select
                    value={selectedPlan?.id}
                    onChange={updateSelectedPlan}
                >
                    <option value="0">-No Plan-</option>
                    {degreePlans.map((plan: Plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button onClick={addPlan}>Add new Plan</Button>
            <Button onClick={deletePlan}>Delete Selected Plan</Button>
            {selectedPlan.id !== "" ? (
                <DegreePlan
                    key={selectedPlan.id}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                    currentPlan={selectedPlan}
                ></DegreePlan>
            ) : (
                <p>No Plan Selected</p>
            )}
        </div>
    );
}

export default App;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./App.css";
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
                    {degreePlans.map((plan: Plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <DegreePlan
                key={selectedPlan.id}
                degreePlans={degreePlans}
                setDegreePlans={setDegreePlans}
                currentPlan={selectedPlan}
            ></DegreePlan>
        </div>
    );
}

export default App;

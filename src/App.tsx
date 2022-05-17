import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import { makeId } from "./createId";
import { DegreePlan } from "./DegreePlan";
import { Plan } from "./Planner-Interfaces/plan";
import DefaultPlans from "./Plans/DefaultPlans.json";

//Loads default plans if no local saved data
let defaulted = DefaultPlans.defaultPlans.map(
    (plan: Plan): Plan => ({ ...plan, id: makeId() })
);
const saveDataKey = "CISC-DEGREE-PLANNER-DATAv2";
// Check if the user's data already exists
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    defaulted = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Plan[]>(defaulted); //List of all plans made
    const [selectedPlan, setSelectedPlan] = useState<number>(-1); //Selected plan, -1 if no plan selected
    //Updates selected plan called from the drop down menu
    function updateSelectedPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPlan(
            degreePlans.findIndex(
                (plan: Plan) => plan.id === event.target.value
            )
        );
    }
    //Will save to local storage
    function saveData() {
        localStorage.setItem(saveDataKey, JSON.stringify(degreePlans));
    }
    //Adds a new plan to the end of the list then switches to that plan
    function addPlan() {
        const newPlan = {
            id: makeId(),
            name: "New Plan",
            semesters: [],
            requiredCourses: []
        };
        setDegreePlans([...degreePlans, newPlan]);
        setSelectedPlan(degreePlans.length);
    }
    //Deletes the selected plan
    function deletePlan() {
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(
            degreePlans.findIndex(
                (plan: Plan) => plan.id === degreePlans[selectedPlan].id
            ),
            1
        );
        setDegreePlans(newDegreePlans);
        setSelectedPlan(-1);
    }
    //Called every time App is refreshed. App refreshed when adding or deleting a semestes, when the save button
    //In DegreePlan.tsx is pressed, or when changing plans. Will save the changes to plans in the case of the first two.
    //Will also save in case of the second one, but no changes will have been made
    saveData();

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
            {/*Dropdown for selecting the plan, maps through the plans and displays them as an option, in addition no plan selected is provided as an option*/}
            <Form.Group controlId="userPlans">
                <Form.Label>Select Degree Plan:</Form.Label>
                <Form.Select
                    value={
                        selectedPlan === -1
                            ? "-No Plan Selected-"
                            : degreePlans[selectedPlan].id
                    }
                    onChange={updateSelectedPlan}
                >
                    <option value={"Special"}>-No Plan Selected-</option>
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
            {selectedPlan !== -1 ? ( //Checks to see if an actual plan is selected if so call DegreePlan to display it
                <DegreePlan
                    key={degreePlans[selectedPlan].id}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                    currentPlan={degreePlans[selectedPlan]}
                ></DegreePlan>
            ) : (
                <h4>No Plan Selected</h4>
            )}
        </div>
    );
}

export default App;

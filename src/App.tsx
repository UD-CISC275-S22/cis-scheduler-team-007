import React, { useState } from "react";
import { Button, Form, ModalBody } from "react-bootstrap";
import "./App.css";
import { makeId } from "./createId";
import { DegreePlan } from "./DegreePlan";
import { Plan } from "./Planner-Interfaces/plan";
declare module "*.png";
import pic from "./udbanner.png";
import DefaultPlans from "./Plans/DefaultPlans.json";
import Modal from "react-modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

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
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }
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
    //Called every time App is refreshed. App refreshed when adding or deleting a semestes, when the save Button
    //In DegreePlan.tsx is pressed, or when changing plans. Will save the changes to plans in the case of the first two.
    //Will also save in case of the second one, but no changes will have been made
    saveData();

    return (
        <div className="App">
            <div className="image">
                <img src={pic} width="100%" height="400px" alt="udbanner" />
                <h2>UD CISC Degree Planner</h2>
                <h5>Eric Toreki, Maxwell Wang, Joshua Strassle</h5>
            </div>
            <div className="App">
                <button className="btn" onClick={toggleModal}>
                    Show Instructions
                </button>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                >
                    <ModalHeader>
                        <p>Hello CISC or INSY Majors and Minors</p>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            To get started, you should click <b>Add New Plan</b>{" "}
                            to create a new plan that can be renamed by clicking
                            the pencil right next to the New Plan that pops up.
                            To get the new name to appear in the dropdown of
                            plans, you should click the <b>Save Plan Changes</b>{" "}
                            button.
                        </p>
                        <p>
                            From there, click on <b>Add Semester</b> to add a
                            semeseter. You can change the name of the semester
                            in the same way you did with the plan name. Then, to
                            add a course, click <b>Add Course</b>.{" "}
                        </p>
                        <p>
                            From the dropdown, type in your course code, and
                            clikc the course code from the dropdown to confirm
                            the choice. Then click <b>Add Course</b> to add the
                            course to the semester table. If the course is not
                            to your liking when in the semester table, you can
                            hit the <b>Edit Course</b> button to alter the
                            course. To fully save the changes, click the{" "}
                            <b>Save Plan Changes</b> button.
                        </p>
                        <p>
                            Should you want to delete a course, semester, or
                            plan, click the button, there is a button for each.
                        </p>
                        <p>
                            Some other additional features that are available
                            are the degree requirements, which can be seen from
                            clicking the <b>Degree Requirements</b> button. In
                            here, you can see all the courses that you need to
                            take along with some other breadth requirements for
                            a basic Computer Science degree. Courses and
                            breadths that are satisfied will have a check mark
                            next to them and those that are not satisfied will
                            have an x mark next to them.
                        </p>
                    </ModalBody>
                    <button
                        onClick={toggleModal}
                        className="btnclose"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal>
            </div>
            {/*Dropdown for selecting the plan, maps through the plans and displays them as an option, in addition no plan selected is provided as an option*/}
            <Form.Group controlId="userPlans">
                <Form.Label>Select Degree Plan:</Form.Label>
                <Form.Select
                    className="dropdownWidth"
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
            <Button onClick={addPlan} className="btnadd">
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

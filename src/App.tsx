import React, { useState } from "react";
import "./App.css";
import { Plan } from "./Planner-Interfaces/plan";

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Plan[]>([
        { id: "1", name: "Test1", semester: [], requiredCourses: [] },
        { id: "2", name: "Test2", semester: [], requiredCourses: [] }
    ]);
    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>By: Eric Toreki, Maxwell Wang, Joshua Strassle</p>
            <li>
                {degreePlans.map((plan: Plan) => (
                    <ul key={plan.id}>{plan.name}</ul>
                ))}
            </li>
        </div>
    );
}

export default App;

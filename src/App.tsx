import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./DegreePlan";
import { Messaging } from "./Messaging";
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
            <Messaging></Messaging>
            {degreePlans.map((plan: Plan) => (
                <DegreePlan
                    key={plan.id}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                    currentPlan={plan}
                ></DegreePlan>
            ))}
        </div>
    );
}

export default App;

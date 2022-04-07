import React, { useState } from "react";
import "./App.css";
import { Plan } from "./Planner-Interfaces/plan";

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Plan[]>([]);
    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>By: Eric Toreki, Maxwell Wang, Joshua Strassle</p>
        </div>
    );
}

export default App;

import React from "react";
import "./App.css";
import { ModifyCourse } from "./ModifyCourse";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <p>My name is Maxwell Wang</p>
            <h2>Joshua Strassle : jstrassl@udel.edu</h2>
            <p>Final Project done by: Eric Toreki</p>
            main
            <ModifyCourse></ModifyCourse>
        </div>
    );
}

export default App;

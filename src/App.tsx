import React from "react";
import "./App.css";
import { DisplayCourse } from "./Course";

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
            <DisplayCourse
                existingCourse={{
                    id: "",
                    name: "",
                    credits: 0,
                    courseId: 0,
                    prereq: ""
                }}
            ></DisplayCourse>
        </div>
    );
}

export default App;

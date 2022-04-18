import React, { useState } from "react";
import "./App.css";
import { DisplayCourse } from "./Course";
import { DegreePlan } from "./DegreePlan";
import { Messaging } from "./Messaging";
import { Plan } from "./Planner-Interfaces/plan";
import { Course } from "./Planner-Interfaces/course";
import Courses from "./CISC-Courses-data/ciscCourses.json";
import { Form } from "react-bootstrap";

function App(): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }
    const compSciCourses = Courses.map(
        (course): Course => ({
            ...course,
            id: course.id,
            name: course.name,
            courseId: course.courseId,
            prereq: course.prereq
        })
    );
    const [degreePlans, setDegreePlans] = useState<Plan[]>([
        { id: "1", name: "Test1", semester: [], requiredCourses: [] },
        { id: "2", name: "Test2", semester: [], requiredCourses: [] }
    ]);
    const [courses, setCourses] = useState<Course[]>(compSciCourses);
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
            existingCourse=
            {courses.map((course: Course) => (
                <DisplayCourse
                    key={course.id}
                    existingCourse={course}
                ></DisplayCourse>
            ))}
            <Form.Check
                type="checkbox"
                id="is-happy-check"
                checked={isEditing}
                onChange={updateEditing}
            />
            <div>Editing {isEditing ? "editing" : "not editing"}</div>
        </div>
    );
}

export default App;

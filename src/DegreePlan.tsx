import React, { useState } from "react";
import { Plan } from "./Planner-Interfaces/plan";

export function DegreePlan(): JSX.Element {
    const [plan, setPlan] = useState<Plan>({
        id: "1",
        name: "Test",
        semester: [],
        requiredCourses: []
    });
    return (
        <div>
            <h4>{plan.name}</h4>
        </div>
    );
}

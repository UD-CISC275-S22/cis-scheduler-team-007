import { DisplaySemester } from "./semester-table";
import { render } from "@testing-library/react";
import React from "react";
import courses from "./CISC-Courses-data/ciscCourses.json";

describe("Semester Table test", () => {
    beforeEach(() => {
        render(
            <DisplaySemester
                semester={{
                    id: "CISC-106",
                    name: "Computer Science for Engineers",
                    credits: 3,
                    season: "Fall",
                    year: 2021,
                    courses: [courses[0]]
                }}
                plan={{ id: "F21", name: "Jane Doe", semester: ["Fall"] }}
                updatePlan={function (plan: Plan): void {}}
            ></DisplaySemester>
        );
    });
});

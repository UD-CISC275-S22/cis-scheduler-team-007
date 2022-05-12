import { DisplaySemester } from "./semester-table";
import { render } from "@testing-library/react";
import React from "react";
import courses from "./CISC-Courses-data/ciscCourses.json";
import { defaultSemesters } from "./basicsem";

// describe("Semester Table test", () => {
//     beforeEach(() => {
//         render(
//             <DisplaySemester
//                 semester={{
//                     id: "CISC-106",
//                     name: "Computer Science for Engineers",
//                     credits: 3,
//                     season: "Fall",
//                     year: 2021,
//                     courses: [courses[0]]
//                 }}
//                 plan={{
//                     id: "F21",
//                     name: "Jane Doe",
//                     semesters: defaultSemesters,
//                     requiredCourses: [courses[0]]
//                 }}
//                 // updatePlan={function (plan: Plan): void {
//                 //     plan.map((plan: Plan): Plan=>(plan: Plan));
//                 // }}
//             ></DisplaySemester>
//         );
//     });
// });

import { Semester } from "./Planner-Interfaces/semester";
import COURSES from "./CISC-Courses-data/ciscCourses.json";

export const defaultSemesters: Semester[] = [
    {
        id: "thing",
        name: "things",
        year: 2022,
        courses: [COURSES[0], COURSES[1], COURSES[2], COURSES[3], COURSES[4]],
        season: "fall",
        credits: 127
    }
];
export {};

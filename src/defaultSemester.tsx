import { Semester } from "./Planner-Interfaces/semester";
import COURSES from "./CISC-Courses-data/ciscCourses.json";

export const defaultSemesters: Semester[] = [
    {
        id: "5",
        name: "Cool",
        year: 2022,
        season: "Fall",
        credits: 5,
        courses: [COURSES[0], COURSES[1], COURSES[2]]
    }
];

import { Semester } from "./semester";
import { Course } from "./course";

export interface Plan {
    id: string;
    name: string;
    semesters: Semester[];
    requiredCourses: Course[];
}

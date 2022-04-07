import { Semester } from "./semester";
import { Course } from "./course";

export interface Plan {
    id: string;
    name: string;
    semsester: Semester[];
    requiredCourses: Course[];
}

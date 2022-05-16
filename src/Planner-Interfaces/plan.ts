import { Semester } from "./semester";

export interface Plan {
    id: string;
    name: string;
    semesters: Semester[];
}

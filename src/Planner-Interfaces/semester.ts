import { Course } from "./course";
export interface Semester {
    id: string;
    name: string;
    year: number;
    courses: Course[];
    season: string;
    credits: number;
}

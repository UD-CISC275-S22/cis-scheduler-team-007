import { Course } from "./course";

export enum seasons {
    "Fall",
    "Winter",
    "Spring",
    "Summer"
}

export interface Semester {
    id: string;
    name: string;
    year: number;
    courses: Course[];
    season: string;
    credits: number;
}

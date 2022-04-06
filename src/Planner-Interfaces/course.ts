export interface Course {
    name: string;
    credits: number;
    courseId: number;
    prereq: Course[];
}

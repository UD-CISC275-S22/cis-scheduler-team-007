export interface Course {
    id: string;
    name: string;
    credits: number;
    courseId: number;
    prereq?: string;
}

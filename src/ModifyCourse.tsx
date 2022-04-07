import React, { useState } from "react";
import { Course } from "./Planner-Interfaces/course";
import Courses from "./CISC-Courses-data/ciscCourses.json";

const compSciCourses = Courses.map(
    (course): Course => ({
        ...course,
        id: course.id,
        name: course.name,
        courseId: course.courseId,
        prereq: course.preReq
    })
);

export function ModifyCourse(): JSX.Element {
    const [course, setCourse] = useState<Course[]>(compSciCourses);

    function deleteCourse(id: string) {
        setCourse(
            compSciCourses.filter((course: Course): boolean => course.id !== id)
        );
    }
    return <div></div>;
}

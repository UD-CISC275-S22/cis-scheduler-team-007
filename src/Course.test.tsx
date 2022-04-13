import { Course } from "./Course";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Modify Course.test", () => {
    beforeEach(() => {
        render(
            <Course
                existingCourse={{
                    id: "",
                    name: "",
                    credits: 0,
                    courseId: 0,
                    prereq: ""
                }}
            />
        );
    });
    test("There are three buttons", () => {
        const removeCourse = screen.getByRole("button", {
            name: /Delete Course/i
        });
        const changeCourse = screen.getByRole("button", {
            name: /Edit Course/i
        });
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        expect(removeCourse).toBeInTheDocument;
        expect(changeCourse).toBeInTheDocument;
        expect(addCourse).toBeInTheDocument;
    });

    test("There is a message displayed on the webpage", () => {
        expect("Greetings CISC/INSY majors and minors").toBeInTheDocument;
    });
});

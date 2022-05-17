import { DisplayCourse } from "./Course";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Display Course Test", () => {
    beforeEach(() => {
        render(
            <DisplayCourse
                existingCourse={{
                    id: "CISC-108",
                    name: "Introduction to Computer Science I",
                    credits: 3,
                    courseId: "108",
                    preReq: ""
                }}
                semester={{
                    id: "",
                    name: "",
                    year: 2021,
                    courses: [],
                    season: "Fall"
                }}
                plan={{
                    id: "1",
                    name: "Test1",
                    semesters: [],
                    requiredCourses: []
                }}
                updatePlan={function (): void {
                    return;
                }}
            />
        );
    });

    test("A initial course is displayed with its credits, name and id", () => {
        expect(
            screen.getByText("Introduction to Computer Science I")
        ).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("108")).toBeInTheDocument();
    });
    test("Checkbox is not checked initially", () => {
        console.log(screen.getByRole("checkbox"));
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        /*expect(screen.getByRole("checkbox").toBeEqual(false));*/
    });

    test("Can switch into edit mode", () => {
        /*expect(screen.getAllByRole("textbox")).toHaveLength(2);*/
        expect(screen.getAllByRole("checkbox")).toHaveLength(1);
    });

    test("Edit the courses changes the course id", () => {
        const switching = screen.getByRole("checkbox");
        switching.click();
        /*const nameBox = screen.getByTestId("courseID");
        userEvent.type(nameBox, "CISC-108");*/
    });
    test("Edit courses changes the course name", () => {
        const changed = screen.getByRole("checkbox");
        changed.click();
        /*const nameBox = screen.getByRole("textbox");
        userEvent.type(nameBox, "courseName");*/
    });
    test("Unchecking the textbox renders the new edits of the course", () => {
        const results = screen.getByRole("checkbox");
        results.click();
        const courseIdentity = screen.getAllByRole("textbox");
        expect(courseIdentity).toHaveLength(2);
        fireEvent.change(courseIdentity[0], {
            target: { value: "CISC 108 - Introduction to Computer Science I" }
        });
        fireEvent.change(courseIdentity[1], {
            target: { value: "4" }
        });
    });
});

import { DisplayCourse } from "./Course";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Modify Course.test", () => {
    beforeEach(() => {
        render(
            <DisplayCourse
                existingCourse={{
                    id: "1",
                    name: "Comp Sci 1",
                    credits: 3,
                    courseId: "CISC-103",
                    prereq: ""
                }}
            />
        );
    });
    test("There are two buttons", () => {
        const removeCourse = screen.getByRole("button", {
            name: /Remove Course/i
        });
        const changeCourse = screen.getByRole("button", {
            name: /Edit Course/i
        });
        expect(removeCourse).toBeInTheDocument;
        expect(changeCourse).toBeInTheDocument;
    });

    test("Clicking the button removes the course by its id", () => {
        //const deleted = screen.getByTestId("1");
        //expect(deleted).not.toBeInTheDocument();
    });

    /*test("Clicking the button removes the course", () => {
        const removed = screen.getByRole("button");
        removed.click();
        removed = screen.getByTestId("Remove Course");
        expect(removed).toHaveLength(1);
    });
    */
});

import { DisplayCourse } from "./Course";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Display Course Test", () => {
    beforeEach(() => {
        render(
            <DisplayCourse
                existingCourse={{
                    id: "13",
                    name: "Introduction to Computer Science I",
                    credits: 3,
                    courseId: "CISC 108",
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
                    semesters: []
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
        expect(screen.getByText("CISC 108")).toBeInTheDocument();
    });
    test("Edit button exists", () => {
        expect(
            screen.getByRole("button", { name: /Edit Course/i })
        ).toBeInTheDocument();
    });
    test("Edit button clicks pulls up edit screen", () => {
        const editBut = screen.getByRole("button", { name: /Edit Course/i });
        editBut.click();
        expect(
            screen.getByRole("button", { name: /Save Changes/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Cancel/i })
        ).toBeInTheDocument();
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        expect(screen.getByRole("spinbutton")).toBeInTheDocument();
        expect(screen.getByText("CourseID:")).toBeInTheDocument();
        expect(screen.getByText("Name of Course:")).toBeInTheDocument();
        expect(screen.getByText("Number of Credits:")).toBeInTheDocument();
        expect(screen.getByText("PreReqs:")).toBeInTheDocument();
    });
    test("Editing field and clicking cancel, displays old info", () => {
        const editBut = screen.getByRole("button", { name: /Edit Course/i });
        editBut.click();
        const cancelBut = screen.getByRole("button", { name: /Cancel/i });
        const creditsText = screen.getByRole("spinbutton");
        userEvent.type(creditsText, "10");
        const courseNameText = screen.getAllByRole("textbox")[0];
        const coursePreReqText = screen.getAllByRole("textbox")[1];
        userEvent.type(courseNameText, "New Name");
        userEvent.type(coursePreReqText, "New PreReq");
        cancelBut.click();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.queryByText("10")).not.toBeInTheDocument();
        expect(
            screen.getByText("Introduction to Computer Science I")
        ).toBeInTheDocument();
        expect(screen.queryByText("New Name")).not.toBeInTheDocument();
        expect(screen.queryByText("New PreReq")).not.toBeInTheDocument();
    });
});

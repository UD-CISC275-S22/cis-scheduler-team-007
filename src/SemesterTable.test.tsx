import { DisplaySemester } from "./SemesterTable";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("SemesterTable component Tests", () => {
    beforeEach(() => {
        render(
            <DisplaySemester
                semester={{
                    id: "1",
                    name: "Test Semester",
                    year: 2020,
                    season: "Fall",
                    courses: [
                        {
                            id: "2",
                            name: "Introduction to Computer Science I",
                            credits: 3,
                            courseId: "CISC 108",
                            preReq: ""
                        },
                        {
                            id: "3",
                            name: "Object Oriented",
                            credits: 5,
                            courseId: "CISC 181",
                            preReq: ""
                        },
                        {
                            id: "3",
                            name: "Data Structures",
                            credits: 1,
                            courseId: "CISC 220",
                            preReq: ""
                        }
                    ]
                }}
                plan={{
                    id: "5",
                    name: "Test Plan",
                    semesters: [
                        {
                            id: "1",
                            name: "Test Semester",
                            year: 2020,
                            season: "Fall",
                            courses: [
                                {
                                    id: "2",
                                    name: "Introduction to Computer Science I",
                                    credits: 3,
                                    courseId: "CISC 108",
                                    preReq: ""
                                },
                                {
                                    id: "3",
                                    name: "Object Oriented",
                                    credits: 5,
                                    courseId: "CISC 181",
                                    preReq: ""
                                },
                                {
                                    id: "3",
                                    name: "Data Structures",
                                    credits: 1,
                                    courseId: "CISC 220",
                                    preReq: ""
                                }
                            ]
                        }
                    ]
                }}
                updatePlan={function (): void {
                    return;
                }}
            ></DisplaySemester>
        );
    });
    test("Semester Name, Buttons, headers, and courses are displayed", () => {
        expect(screen.getByText("Test Semester")).toBeInTheDocument();
        expect(screen.getByText("Course")).toBeInTheDocument();
        expect(screen.getByText("Course Name")).toBeInTheDocument();
        expect(screen.getByText("Credits")).toBeInTheDocument();
        expect(screen.getByText("Delete Course")).toBeInTheDocument();
        expect(screen.getByText("CISC 108")).toBeInTheDocument();
        expect(screen.getByText("CISC 181")).toBeInTheDocument();
        expect(screen.getByText("CISC 220")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Edit Semester Name/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Add Course/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Remove All Courses/i })
        ).toBeInTheDocument();
        expect(
            screen.getAllByRole("button", { name: /Edit Course/i })
        ).toHaveLength(3);
    });
    test("Editing Sem name brings up stop button and textbox", () => {
        const editSemNameBut = screen.getByRole("button", {
            name: /Edit Semester Name/i
        });
        editSemNameBut.click();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: /Edit Semester Name/i })
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Stop Editing/i })
        ).toBeInTheDocument();
    });
});

import { DegreeRequirements_Section } from "./degree";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Modal } from "react-bootstrap";

describe("Degree_Requirements_Section test", () => {
    beforeEach(() => {
        render(
            <DegreeRequirements_Section
                show={true}
                setShow={function (b: false): void {
                    throw new Error("Function not implemented.");
                }}
                userSemesters={[
                    {
                        season: "Fall",
                        year: 2019,
                        name: "My Fall Semester",
                        id: "F19",
                        courses: [
                            {
                                name: "Introduction to Computer Science I",
                                credits: 3,
                                courseId: "CISC 108",
                                preReq: "",
                                id: ""
                            },
                            {
                                name: "English in Composition",
                                credits: 3,
                                courseId: "ENGL 110",
                                preReq: "",
                                id: ""
                            },
                            {
                                name: "Introduction to Engineering",
                                credits: 3,
                                courseId: "EGGG 101",
                                preReq: "",
                                id: ""
                            },
                            {
                                name: "Calculus 1",
                                credits: 3,
                                courseId: "MATH 241",
                                preReq: "",
                                id: ""
                            }
                        ]
                    },
                    {
                        season: "Spring",
                        year: 2020,
                        name: "My Spring Semester",
                        id: "S20",
                        courses: [
                            {
                                name: "Introduction to Computer Science II",
                                credits: 3,
                                courseId: "CISC 181",
                                preReq: "CISC 108 or CISC 106",
                                id: ""
                            },
                            {
                                name: "Introduction to Systems Programming",
                                credits: 3,
                                courseId: "CISC 210",
                                preReq: "CISC 108 or CISC 106",
                                id: ""
                            },
                            {
                                name: "MATH 242",
                                credits: 3,
                                courseId: "MATH 242",
                                preReq: "MATH 241",
                                id: ""
                            }
                        ]
                    }
                ]}
            ></DegreeRequirements_Section>
        );
        describe("Degree tests", () => {
            test("Modal shows up", () => {
                const button = screen.getByText("button");
                expect(button).toBeInTheDocument();
                button.click();
            });
            test("University Requirements are shown", () => {
                expect(screen.getByText("University Requirements"));
            });
            test("Modal closes when closed", () => {
                const handleClose = jest.fn();
                const { getByText } = render(
                    <Modal onClose={handleClose}>Degree Requirements</Modal>
                );
                expect(getByText("Degree Requirements")).toBeTruthy();
                expect(handleClose).toHaveBeenCalledTimes(1);
            });
            test("When a CISC 108 is added a green checkmark appears", () => {
                const firstCisc = screen.getByText("CISC 108");
                expect(firstCisc).toBeInTheDocument();
                expect(screen.queryByText(/✔️/i)).toBeInTheDocument();
            });
            test("When ENGL 110 is selected, another green checkmark appears", () => {
                const english = screen.getByText("ENGL 110");
                expect(english).toBeInTheDocument();
                expect(screen.queryByText(/✔️/i)).toBeInTheDocument();
            });
            test("When EGGG 101 is selected, it fufills the first year seminar", () => {
                const eggg = screen.getByText("EGGG 101");
                expect(eggg).toBeInTheDocument();
                expect(screen.queryByText(/✔️/i)).toBeInTheDocument();
            });
            test("When not checking any of the courses, a red x appears", () => {
                expect(screen.queryByText(/❌/i)).toBeInTheDocument();
                expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
            });
        });
    });
});

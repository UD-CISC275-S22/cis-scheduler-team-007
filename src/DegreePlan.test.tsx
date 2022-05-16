import React from "react";
import { render, screen } from "@testing-library/react";
import { DegreePlan } from "./DegreePlan";

describe("DegreePlan Component Tests", () => {
    beforeEach(() => {
        render(
            <DegreePlan
                degreePlans={[
                    {
                        id: "1",
                        name: "Test1",
                        semesters: []
                    },
                    {
                        id: "2",
                        name: "Test2",
                        semesters: []
                    }
                ]}
                setDegreePlans={function (): void {
                    throw new Error("Function not implemented.");
                }}
                currentPlan={{
                    id: "1",
                    name: "Test1",
                    semesters: []
                }}
            />
        );
    });
    test("Plan name is displayed as Test1", () => {
        expect(screen.getByText("Test1")).toBeInTheDocument();
        expect(screen.queryByText("Test2")).not.toBeInTheDocument();
    });
    test("Save, and Add buttons exist", () => {
        expect(
            screen.getByRole("button", { name: /Add Semester/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Save Plan Changes/i })
        ).toBeInTheDocument();
    });
    test("Add button creates a new semester", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        expect(screen.getByText("Fall")).toBeInTheDocument();
    });
    test("Semester has insert and delete buttons", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        expect(
            screen.getByRole("button", { name: /Insert New Semester/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Delete This Semester/i })
        ).toBeInTheDocument();
    });
    test("Insert button works", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        const insertButton = screen.getByRole("button", {
            name: /Insert New Semester/i
        });
        insertButton.click();
        expect(screen.getByText("Copy of Fall")).toBeInTheDocument();
    });
    test("Delete button works", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        const delButton = screen.getByRole("button", {
            name: /Delete This Semester/i
        });
        delButton.click();
        expect(screen.queryByText("New Semester")).not.toBeInTheDocument();
    });
    test("Delete All Semesters button works", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        addButton.click();
        addButton.click();
        const delSemButton = screen.getByRole("button", {
            name: /Delete All Semesters/i
        });
        delSemButton.click();
        expect(screen.queryByText("New Semester")).not.toBeInTheDocument();
    });
});

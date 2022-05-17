import React from "react";
import { render, screen } from "@testing-library/react";
import { DegreePlan } from "./DegreePlan";
import userEvent from "@testing-library/user-event";

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
    test("Save, Edit, and Add buttons exist", () => {
        expect(
            screen.getByRole("button", { name: /Add Semester/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Save Plan Changes/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Edit Name/i })
        ).toBeInTheDocument();
    });
    test("Edit button opens up a text box, and Stop Editing button", () => {
        const editButton = screen.getByRole("button", { name: /Edit Name/i });
        editButton.click();
        expect(
            screen.getByRole("button", { name: /Stop Editing/i })
        ).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
    test("Editing title actually updates title", () => {
        const editButton = screen.getByRole("button", { name: /Edit Name/i });
        editButton.click();
        const stopEditButton = screen.getByRole("button", {
            name: /Stop Editing/i
        });
        const editText = screen.getByRole("textbox");
        userEvent.type(editText, "New Plan Name");
        stopEditButton.click();
        expect(screen.getByText(/New Plan Name/i)).toBeInTheDocument();
    });
    test("Add button creates a new semester", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        expect(screen.getByText("New Semester")).toBeInTheDocument();
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
        expect(screen.getByText("Copy of New Semester")).toBeInTheDocument();
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
    test("Delete all Semesters button exists", () => {
        expect(
            screen.getByRole("button", { name: /Delete All Semesters/i })
        ).toBeInTheDocument();
    });
    test("Delete All Semesters button works", () => {
        const addButton = screen.getByRole("button", { name: /Add Semester/i });
        addButton.click();
        const insertButton = screen.getByRole("button", {
            name: /Insert New Semester/i
        });
        insertButton.click();
        addButton.click();
        addButton.click();
        const delSemButton = screen.getByRole("button", {
            name: /Delete All Semesters/i
        });
        delSemButton.click();
        expect(screen.queryByText("New Semester")).not.toBeInTheDocument();
        expect(
            screen.queryByText("Copy of New Semester")
        ).not.toBeInTheDocument();
    });
});

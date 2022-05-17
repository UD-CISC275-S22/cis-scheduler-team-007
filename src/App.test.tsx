import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the title name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/UD CISC Degree Planner/i);
    expect(linkElement).toBeInTheDocument();
});

describe("App Component Tests", () => {
    beforeEach(() => {
        render(<App></App>);
    });
    test("No Plan Seleccted by default", () => {
        expect(
            screen.getByRole("heading", { name: /No Plan Selected/i })
        ).toBeInTheDocument();
    });
    test("Delete and Add Plan button exist", () => {
        expect(
            screen.getByRole("button", { name: /Add New Plan/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Delete Selected Plan/i })
        ).toBeInTheDocument();
    });
    test("Add Plan adds plan and switches to new plan", () => {
        const addButton = screen.getByRole("button", { name: /Add New Plan/i });
        addButton.click();
        expect(
            screen.getByRole("heading", { name: /New Plan/i })
        ).toBeInTheDocument();
    });
    test("Delete Plan removes current plan and switches to no plan", () => {
        const addButton = screen.getByRole("button", { name: /Add New Plan/i });
        addButton.click();
        const delButton = screen.getByRole("button", {
            name: /Delete Selected Plan/i
        });
        delButton.click();
        expect(
            screen.getByRole("heading", { name: /No Plan Selected/i })
        ).toBeInTheDocument();
    });
    test("Drop Down exists", () => {
        expect(screen.getByLabelText(/Select Degree Plan:/i));
    });
});

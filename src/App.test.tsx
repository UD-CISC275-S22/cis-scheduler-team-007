import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the title name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/UD CISC Degree Planner/i);
    expect(linkElement).toBeInTheDocument();
});

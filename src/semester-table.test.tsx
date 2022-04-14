import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Diplays a table", () => {
    render(<App />);

    expect(screen.getByText("Course")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Credits")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
});

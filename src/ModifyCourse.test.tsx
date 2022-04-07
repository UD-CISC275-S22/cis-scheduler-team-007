import { ModifyCourse } from "./ModifyCourse";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Modify Course.test", () => {
    beforeEach(() => {
        render(<ModifyCourse />);
    });
    
    test("CISC-108 is shown", () => {
        const CISC108 = screen.getByText(/ModifyCourse: (.*)/i);
        expect(CISC108).toBeInTheDocument();
    });
});

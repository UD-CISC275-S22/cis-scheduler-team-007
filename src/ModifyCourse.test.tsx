import { ModifyCourse } from "./ModifyCourse";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Modify Course.test", () => {
    beforeEach(() => {
        render(<ModifyCourse />);
    });
    test("There are three buttons", () => {
        const removeCourse = screen.getByRole("button", {
            name: /Delete Course/i
        });
        const changeCourse = screen.getByRole("button", {
            name: /Edit Course/i
        });
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        expect(removeCourse).toBeInTheDocument;
        expect(changeCourse).toBeInTheDocument;
        expect(addCourse).toBeInTheDocument;
    });
});

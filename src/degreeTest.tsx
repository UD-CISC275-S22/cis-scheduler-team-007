import { DegreeRequirements_Section } from "./degree";
import React from "react";
import { render } from "@testing-library/react";

describe("Degree_Requirements_Section test", () => {
    beforeEach(() => {
        render(
            <DegreeRequirements_Section
                show={false}
                setShow={function (b: boolean): void {
                    throw new Error("Function not implemented.");
                }}
                userSemesters={[]}
            ></DegreeRequirements_Section>
        );
        test("Modal shows up", () => {
            const aModal = document.createElement("div");
        });
    });
});

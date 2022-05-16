import { DegreeRequirements_Section } from "./degree";
import React, {useEffect} from "react";
import { render, screen } from "@testing-library/react";
import { Modal } from "react-bootstrap";

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
            const button = screen.getByText("button");
            expect(button).toBeInTheDocument();
            button.click();
        });
        test("University Requirements are shown", ()=>{
            expect(screen.getByText("University Requirements"));
        });
        test("Modal closes when closed", ()=>{
            const handleClose = jest.fn();
            const {getByText} = render(<Modal onClose={handleClose}>Degree Requirements</Modal>)
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
    });
});

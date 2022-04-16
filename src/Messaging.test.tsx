import { Messaging } from "./Messaging";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Messaging Test", () => {
    beforeEach(() => {
        render(<Messaging></Messaging>);
    });
    test("The message is initially hidden", () => {
        const valueText = screen.queryByText(
            /Hello CISC or INSY majors and minors/i
        );
        expect(valueText).toBeNull();
    });
    test("There is a message displayed on the webpage after button is clicked", () => {
        const messaging = screen.getByRole("button", {
            name: /Display Message/i
        });
        messaging.click();
        expect("Hello CISC or INSY majors and minors").toBeInTheDocument;
        expect("In here you are choosing a plan for your cisc degree")
            .toBeInTheDocument;
    });
});

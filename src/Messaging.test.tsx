import { Messaging } from "./Messaging";
import { render } from "@testing-library/react";
import React from "react";

describe("Messaging Test", () => {
    beforeEach(() => {
        render(<Messaging></Messaging>);
    });
    test("There is a message displayed on the webpage", () => {
        expect("Hello CISC or INSY majors and minors").toBeInTheDocument;
        expect("In here you are choosing a plan for your cisc degree")
            .toBeInTheDocument;
    });
});

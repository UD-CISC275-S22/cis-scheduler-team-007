import { ModifyCourse } from "./ModifyCourse";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Modify Course.test", () => {
    render(<ModifyCourse />);
});

test("CISC-108 is shown");

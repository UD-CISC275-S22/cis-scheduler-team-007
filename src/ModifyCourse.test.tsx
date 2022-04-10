import { ModifyCourse } from "./ModifyCourse";
import { render } from "@testing-library/react";
import React from "react";

describe("Modify Course.test", () => {
    beforeEach(() => {
        render(<ModifyCourse />);
    });
});

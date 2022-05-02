import React from "react";
import { render, screen } from "@testing-library/react";
import { PreReqs } from "./PreReqs";

describe("DegreePlan Component Tests", () => {
    beforeEach(() => {
        render(
            <PreReqs
                allSemesters={[
                    {
                        id: "1",
                        name: "First Sem",
                        year: 2020,
                        courses: [
                            {
                                id: "Course1",
                                name: "Semester 1 No PreReqs",
                                courseId: "NOPRE",
                                credits: 0,
                                preReq: ""
                            },
                            {
                                id: "Course2",
                                name: "Semester 1 with PreReq",
                                courseId: "PRES1",
                                credits: 0,
                                preReq: "REQS1"
                            },
                            {
                                id: "Course3",
                                name: "Semester 1 PREREQ for Semester 2",
                                courseId: "PRES2",
                                credits: 0,
                                preReq: ""
                            }
                        ],
                        season: "Fall",
                        credits: 0
                    },
                    {
                        id: "2",
                        name: "Second Sem",
                        year: 2021,
                        courses: [
                            {
                                id: "Course4",
                                name: "Semester 2 No PreReqs",
                                courseId: "NOPRE",
                                credits: 0,
                                preReq: ""
                            },
                            {
                                id: "Course5",
                                name: "Semester 2 with Prereq: PRES2",
                                courseId: "REQS2",
                                credits: 0,
                                preReq: "PRES2"
                            },
                            {
                                id: "Course6",
                                name: "Semester 2 with PREREQ not in Semester 1",
                                courseId: "MISPRE",
                                credits: 0,
                                preReq: "MISSING"
                            }
                        ],
                        season: "Spring",
                        credits: 0
                    }
                ]}
                semester={{
                    id: "1",
                    name: "First Sem",
                    year: 2020,
                    courses: [
                        {
                            id: "Course1",
                            name: "Semester 1 No PreReqs",
                            courseId: "NOPRE",
                            credits: 0,
                            preReq: ""
                        },
                        {
                            id: "Course2",
                            name: "Semester 1 with PreReq",
                            courseId: "PRES1",
                            credits: 0,
                            preReq: "REQS1"
                        },
                        {
                            id: "Course3",
                            name: "Semester 1 PREREQ for Semester 2",
                            courseId: "PRES2",
                            credits: 0,
                            preReq: ""
                        }
                    ],
                    season: "Fall",
                    credits: 0
                }}
            ></PreReqs>
        );
    });
    test("NOPRE and PRES2 do not have unmet prereqs", () => {
        expect(screen.queryByText("NOPRE requires")).not.toBeInTheDocument();
        expect(screen.queryByText("PRES2 requires")).not.toBeInTheDocument();
    });
    test("Missing prereq for PRES1 that is REQS1", () => {
        expect(screen.getByText("PRES1 requires REQS1")).toBeInTheDocument();
    });
});
describe("DegreePlan Component Tests", () => {
    beforeEach(() => {
        render(
            <PreReqs
                allSemesters={[
                    {
                        id: "1",
                        name: "First Sem",
                        year: 2020,
                        courses: [
                            {
                                id: "Course1",
                                name: "Semester 1 No PreReqs",
                                courseId: "NOPRE",
                                credits: 0,
                                preReq: ""
                            },
                            {
                                id: "Course2",
                                name: "Semester 1 with PreReq",
                                courseId: "PRES1",
                                credits: 0,
                                preReq: "REQS1"
                            },
                            {
                                id: "Course3",
                                name: "Semester 1 PREREQ for Semester 2",
                                courseId: "PRES2",
                                credits: 0,
                                preReq: ""
                            }
                        ],
                        season: "Fall",
                        credits: 0
                    },
                    {
                        id: "2",
                        name: "Second Sem",
                        year: 2021,
                        courses: [
                            {
                                id: "Course4",
                                name: "Semester 2 No PreReqs",
                                courseId: "NOPRE",
                                credits: 0,
                                preReq: ""
                            },
                            {
                                id: "Course5",
                                name: "Semester 2 with Prereq: PRES2",
                                courseId: "REQS2",
                                credits: 0,
                                preReq: "PRES2"
                            },
                            {
                                id: "Course6",
                                name: "Semester 2 with PREREQ not in Semester 1",
                                courseId: "MISPRE",
                                credits: 0,
                                preReq: "MISSING"
                            },
                            {
                                id: "Course7",
                                name: "Semester 2 with PREREQ not in Semester 1, but in Semester 2 and 3",
                                courseId: "MISPRE2",
                                credits: 0,
                                preReq: "REQS2"
                            }
                        ],
                        season: "Spring",
                        credits: 0
                    },
                    {
                        id: "3",
                        name: "Third Sem",
                        year: 2021,
                        courses: [
                            {
                                id: "Course8",
                                name: "Semester 3 prereq for course in semester 2",
                                courseId: "REQS2",
                                credits: 0,
                                preReq: ""
                            }
                        ],
                        season: "Fall",
                        credits: 0
                    }
                ]}
                semester={{
                    id: "2",
                    name: "Second Sem",
                    year: 2021,
                    courses: [
                        {
                            id: "Course4",
                            name: "Semester 2 No PreReqs",
                            courseId: "NOPRE",
                            credits: 0,
                            preReq: ""
                        },
                        {
                            id: "Course5",
                            name: "Semester 2 with Prereq: PRES2",
                            courseId: "REQS2",
                            credits: 0,
                            preReq: "PRES2"
                        },
                        {
                            id: "Course6",
                            name: "Semester 2 with PREREQ not in Semester 1",
                            courseId: "MISPRE",
                            credits: 0,
                            preReq: "MISSING"
                        },
                        {
                            id: "Course7",
                            name: "Semester 2 with PREREQ not in Semester 1, but in Semester 2 and 3",
                            courseId: "MISPRE2",
                            credits: 0,
                            preReq: "REQS2"
                        }
                    ],
                    season: "Spring",
                    credits: 0
                }}
            ></PreReqs>
        );
    });
    test("NOPRE has no prereq", () => {
        expect(screen.queryByText("NOPRE requires")).not.toBeInTheDocument();
    });
    test("REQS2 with a prereq that exists in semester 1 isn't displayed as missing", () => {
        expect(screen.queryByText("PRES2 requires")).not.toBeInTheDocument();
    });
    test("Missing prereq for MISPRE that is MISSING", () => {
        expect(screen.getByText("MISPRE requires MISSING")).toBeInTheDocument();
    });
    test("Missing prereq for MISPRE2 that is MISSING2", () => {
        expect(screen.getByText("MISPRE requires MISSING")).toBeInTheDocument();
    });
});

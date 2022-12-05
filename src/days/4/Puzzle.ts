import Puzzle from "../../types/AbstractPuzzle"

export default class ConcretePuzzle extends Puzzle {
    private getElfAssignments(): number[][][] {
        const assignments = this.input
            .split("\n")
            .filter((e) => e !== "")
            .map((line) => line.split(","))
        return assignments.map((assignment) =>
            assignment.map((assignment) =>
                assignment.split("-").map((e) => Number(e))
            )
        )
    }

    public solveFirst(): string {
        const assignments = this.getElfAssignments()
        let fullyContained = 0

        assignments.forEach((assignment) => {
            if (
                (assignment[0][0] >= assignment[1][0] &&
                    assignment[0][1] <= assignment[1][1]) ||
                (assignment[1][0] >= assignment[0][0] &&
                    assignment[1][1] <= assignment[0][1])
            ) {
                fullyContained++
            }
        })
        return fullyContained.toString()
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "450"
    }

    public solveSecond(): string {
        const assignments = this.getElfAssignments()
        let overlapping = 0

        assignments.forEach((assignment) => {
            if (
                (assignment[0][0] <= assignment[1][0] &&
                    assignment[0][1] >= assignment[1][0]) ||
                (assignment[1][0] <= assignment[0][0] &&
                    assignment[1][1] >= assignment[0][0])
            ) {
                overlapping++
            }
        })
        return overlapping.toString()
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        return "837"
    }
}

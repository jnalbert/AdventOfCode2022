import Puzzle from "../../types/AbstractPuzzle"

interface Movement {
    direction: string
    count: number
}

export default class ConcretePuzzle extends Puzzle {
    private getMovements(): Movement[] {
        return this.input.split("\n").map((move: string) => {
            return {
                direction: move[0],
                count: parseInt(move.slice(1), 10),
            }
        })
    }

    public solveFirst(): string {
        const movements = this.getMovements()
        const positionTail = [0, 0]
        const positionHead = [0, 0]
        const visited = new Set<string>("0,0")

        for (const move of movements) {
            const direction = move.direction
            const count = move.count

            for (let i = 0; i < count; i++) {
                if (direction === "R") {
                    positionHead[0]++
                } else if (direction === "L") {
                    positionHead[0]--
                } else if (direction === "U") {
                    positionHead[1]++
                } else if (direction === "D") {
                    positionHead[1]--
                }

                // check if the tail is adjacent to the head
                if (
                    Math.abs(positionHead[0] - positionTail[0]) > 1 ||
                    Math.abs(positionHead[1] - positionTail[1]) > 1
                ) {
                    if (positionHead[0] !== positionTail[0]) {
                        positionHead[0] > positionTail[0]
                            ? positionTail[0]++
                            : positionTail[0]--
                    }
                    if (positionHead[1] !== positionTail[1]) {
                        positionHead[1] > positionTail[1]
                            ? positionTail[1]++
                            : positionTail[1]--
                    }
                }
                visited.add(positionTail.join(","))
            }
        }
        return (visited.size - 2).toString()
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "5874"
    }

    public solveSecond(): string {
        const movements = this.getMovements()
        // refactor the rope code below into simpler syntax
        // make an array with 10 elements all of which are [0,0]
        const rope = Array.from({ length: 10 }, () => [0, 0])
       
        const visitedPoints = new Set<string>("0,0")

        for (const move of movements) {
            const direction = move.direction
            const count = move.count

            for (let i = 0; i < count; i++) {
                if (direction === "R") {
                    rope[0][0]++
                } else if (direction === "L") {
                    rope[0][0]--
                } else if (direction === "U") {
                    rope[0][1]++
                } else if (direction === "D") {
                    rope[0][1]--
                }

                // go through the rope and move the nots accordingly
                for (let j = 1; j < rope.length; j++) {
                    if (
                        Math.abs(rope[j][0] - rope[j - 1][0]) > 1 ||
                        Math.abs(rope[j][1] - rope[j - 1][1]) > 1
                    ) {
                        if (rope[j][0] !== rope[j - 1][0]) {
                            rope[j - 1][0] > rope[j][0]
                                ? rope[j][0]++
                                : rope[j][0]--
                        }
                        if (rope[j][1] !== rope[j - 1][1]) {
                            rope[j - 1][1] > rope[j][1]
                                ? rope[j][1]++
                                : rope[j][1]--
                        }
                    }
                }

                visitedPoints.add(rope[rope.length - 1].join(","))
            }
        }
        return (visitedPoints.size - 2).toString()
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        return "2467"
    }
}

import Puzzle from "../../types/AbstractPuzzle"

interface instruction {
    command: string
    value?: string
}

export default class ConcretePuzzle extends Puzzle {
    private getInstructions(): instruction[] {
        return this.input.split("\n").map((line) => {
            const commands = line.split(" ")
            if (commands[1]) {
                return { command: commands[0], value: commands[1] }
            }
            return { command: commands[0] }
        })
    }

    public solveFirst(): string {
        const instructions = this.getInstructions()
        let register = 1
        let cycle = 1
        let signalStrength = 0
        let canContinueThrough = false

        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i].command

            if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
                signalStrength += register * cycle
            }

            if (instruction === "addx") {
                if (canContinueThrough) {
                    register += Number(instructions[i].value)
                } else {
                    i--
                }
                canContinueThrough = !canContinueThrough
            }
            cycle++
        }
        return signalStrength.toString()
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "14040"
    }

    public solveSecond(): string {
        const instructions = this.getInstructions()
        let register = 1
        let cycle = 1
        let canContinueThrough = false
        let indexCRT = 0
        const CRT: string[] = ["", "", "", "", "", ""]

        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i].command
            // check if the cycle is within one of the register
            if (Math.abs(register - (cycle - 1)) <= 1) {
                CRT[indexCRT] += "#"
            } else {
                CRT[indexCRT] += "."
            }

            if (instruction === "addx") {
                if (canContinueThrough) {
                    register += Number(instructions[i].value)
                } else {
                    i--
                }
                canContinueThrough = !canContinueThrough
            }
            if (cycle % 40 === 0) {
                indexCRT++
                cycle -= 40
            }
            cycle++
        }
        return CRT.join("\n")
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        // ZGCJZJFL
        return "####..##...##....##.####...##.####.#....\n...#.#..#.#..#....#....#....#.#....#....\n..#..#....#.......#...#.....#.###..#....\n.#...#.##.#.......#..#......#.#....#....\n#....#..#.#..#.#..#.#....#..#.#....#....\n####..###..##...##..####..##..#....####."
    }
}

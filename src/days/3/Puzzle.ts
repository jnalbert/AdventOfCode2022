import Puzzle from "../../types/AbstractPuzzle"

export default class ConcretePuzzle extends Puzzle {
    private getItemValue(item: string): number {
        let value = item.charCodeAt(0)
        // subtract 96 for lowercase letters
        // subtract 38 for uppercase letters
        return value - (65 <= value && value <= 90 ? 38 : 96)
    }

    private getRucksacks(): string[][] {
        // split the input at half way into separate rucksacks
        return this.input.split("\n").map((line) => {
            // slice the input into two equal rucksacks
            return [line.slice(0, line.length / 2), line.slice(line.length / 2)]
        })
    }

    public solveFirst(): string {
        const rucksacks = this.getRucksacks()
        let totalPriority = 0
        // find the duplicates in both rucksacks
        rucksacks.forEach((rucksack) => {
            const compartment1 = rucksack[0]
            const compartment2 = rucksack[1]
            for (let i = 0; i < compartment1.length; i++) {
                if (compartment2.includes(compartment1[i])) {
                    totalPriority += this.getItemValue(compartment1[i])
                    break
                }
            }
        })
        return totalPriority.toString()
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "7997"
    }

    private getElfGroups(): string[][] {
        // split the input in groups of 3 lines
        const elfGroups = []
        const lines = this.input.split("\n")
        for (let i = 0; i < lines.length; i += 3) {
            elfGroups.push([lines[i], lines[i + 1], lines[i + 2]])
        }
        return elfGroups
    }

    public solveSecond(): string {
        const elfGroups = this.getElfGroups()

        let totalPriority = 0
        // find the duplicates in both rucksacks
        elfGroups.forEach((elfGroup) => {
            // order the elves by length in an array
            const elfsOrdered = elfGroup.sort((a, b) => b.length - a.length)
            // loop through the first longest elf
            for (let i = 0; i < elfsOrdered[0].length; i++) {
                // check if the current item is in all of the other elves
                if (
                    elfsOrdered[1].includes(elfsOrdered[0][i]) &&
                    elfsOrdered[2].includes(elfsOrdered[0][i])
                ) {
                    totalPriority += this.getItemValue(elfsOrdered[0][i])
                    break
                }
            }
        })
        return totalPriority.toString()
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        return "2545"
    }
}

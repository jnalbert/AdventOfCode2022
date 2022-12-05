/* eslint-disable semi */
import Puzzle from "../../types/AbstractPuzzle"

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        let maxCalories = 0

        // split the string at the empty line
        const elves = this.input.split("\n\n").map((elf) => elf.split("\n"))

        elves.forEach((elf) => {
            let calories = 0
            elf.forEach((food) => (calories += parseInt(food)))
            maxCalories = Math.max(maxCalories, calories)
        })

        return maxCalories.toString()
    }
    public solveSecond(): string {
        const maxCalorieElves: number[] = []

        // splits the string into individual elves
        const elves = this.input.split("\n\n").map((elf) => elf.split("\n"))

        elves.forEach((elf) => {
            let calories = 0
            elf.forEach((food) => (calories += parseInt(food)))

            maxCalorieElves.push(calories)
            // sort the calories from greatest to least
            maxCalorieElves.sort((a, b) => b - a)
            // if the array is greater than 3, remove the last element
            maxCalorieElves.length > 3 && maxCalorieElves.pop()
        })

        // return the sum of the maxCaloriesElves array
        return maxCalorieElves.reduce((a, b) => a + b).toString()
    }

    public getFirstExpectedResult(): string {
        return "70720"
    }
    public getSecondExpectedResult(): string {
        return "207148"
    }
}

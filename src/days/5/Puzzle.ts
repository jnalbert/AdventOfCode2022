import Puzzle from "../../types/AbstractPuzzle"

const cargoShipmentBase = [
    ["R", "S", "L", "F", "Q"],
    ["N", "Z", "Q", "G", "P", "T"],
    ["S", "M", "Q", "B"],
    ["T", "G", "Z", "J", "H", "C", "B", "Q"],
    ["P", "H", "M", "B", "N", "F", "S"],
    ["P", "C", "Q", "N", "S", "L", "V", "G"],
    ["W", "C", "F"],
    ["Q", "H", "G", "Z", "W", "V", "P", "M"],
    ["G", "Z", "D", "L", "C", "N", "R"],
]

interface Rearrangement {
    amount: number
    from: number
    to: number
}

export default class ConcretePuzzle extends Puzzle {
    private getRearrangements(): Rearrangement[] {
        return this.input.split("\n").map((line) => {
            const sliptAtSpaces = line.split(" ")
            return {
                amount: Number(sliptAtSpaces[1]),
                from: Number(sliptAtSpaces[3]) - 1,
                to: Number(sliptAtSpaces[5]) - 1,
            }
        })
    }

    public solveFirst(): string {
        const rearrangements = this.getRearrangements()

        // copy the cargoShipmentBase
        const cargoShipment = cargoShipmentBase.map((row) => [...row])
        rearrangements.forEach((rearrangement) => {
            const fromRow = cargoShipment[rearrangement.from]
            const toRow = cargoShipment[rearrangement.to]
            const itemsToMove = fromRow.splice(
                fromRow.length - rearrangement.amount
            )
            // reverse the order of items to move
            toRow.push(...itemsToMove.reverse())
            // console.log(cargoShipment)
        })

        // return the last item of each row
        return cargoShipment.map((row) => row[row.length - 1]).join("")
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "FZCMJCRHZ"
    }

    public solveSecond(): string {
        const rearrangements = this.getRearrangements()

        const cargoShipment = cargoShipmentBase.map((row) => [...row])

        rearrangements.forEach((rearrangement) => {
            const fromRow = cargoShipment[rearrangement.from]
            const toRow = cargoShipment[rearrangement.to]
            const itemsToMove = fromRow.splice(
                fromRow.length - rearrangement.amount
            )
            // reverse the order of items to move
            toRow.push(...itemsToMove)
            // console.log(cargoShipment)
        })

        // return the last item of each row
        return cargoShipment.map((row) => row[row.length - 1]).join("")
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        return "JSDHQMZGF"
    }
}

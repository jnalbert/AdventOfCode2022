import Puzzle from '../../types/AbstractPuzzle';

// if both are integers
//  - the lower integer should come first
// if both are lists
//  - compare the first values in each list
//  - if the left list runs out of values first then they are in the right order
//  - if the right list runs out of values first then they are not in the right order
//  - if they are the same order and the comparison does not make the decison move on
// if one is an integer and one is a list
//  - convert the integer to a list and compare that way
// if the inputs are ever in the right order where the left is less than the right then return in the right order

export default class ConcretePuzzle extends Puzzle {

    private getDistressPairs(): any {
        return this.input.split("\n\n").map((lines: string) => {
            const line1 = lines.split("\n")[0]
            const line2 = lines.split("\n")[1]

            return [JSON.parse(line1), JSON.parse(line2)]
        })
    }

    private checkIfPairsAreInOrder(list: any, value: any): boolean {
        return true
    }

  public solveFirst(): string {
    const distressPairs = this.getDistressPairs()
    const indexesInOrder = []

    distressPairs.forEach((pair: any) => {

    })

    return 'day 1 solution 1';
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

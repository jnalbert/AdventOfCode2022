import Puzzle from '../../types/AbstractPuzzle';

interface Monkie {
    items: number[];
    operation: "+" | "*";
    test: number;
    ifTrueGoTo: number;
    ifFalseGoTo: number;
    itemsInspected: number;
}

export default class ConcretePuzzle extends Puzzle {

    // private getMonkies(): Monkie[] {
    //     return this.input.split("\r
    // }

  public solveFirst(): string {
    // slit the input at each empty line

    const monkies = this.input.split("\r").map((monkie) => {
        const monkieItems = monkie.split("\n")
        // gets the starting items of the monkies and converts them to numbers
        const items = monkieItems[1].slice(monkieItems[1].indexOf(": ") + 2).split(", ").map((item) => Number(item))
        const operation = monkieItems[2].includes("+") ? "+" : "*"
        const test = Number(monkieItems[3].slice(monkieItems[3].indexOf("by ") + 3)[0])
        return test
    })
    console.log(monkies)
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

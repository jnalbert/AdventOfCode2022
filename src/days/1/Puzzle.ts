import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string { 
    let maxCalories = 0;

    // split the string at the empty line
    const elves = this.input.split('\n\n');
    
    
    console.log(elves)

    return "blank"
  }
  public solveSecond(): string {
    return 'day 1 solution 2';
  }

  public getFirstExpectedResult(): string {
    return 'day 1 solution 1';
  }
  public getSecondExpectedResult(): string {
    return 'day 1 solution 2';
  }
}

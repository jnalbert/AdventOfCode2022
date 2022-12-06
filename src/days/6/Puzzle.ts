import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {


  public solveFirst(): string {
    // loop through input and get the 4 character spans
    for (let i = 0; i < this.input.length; i++) {
      const current4 = this.input.substring(i, i + 4);
      // check if current4 has a duplicate character
      if (!/(.).*\1/.test(current4)) {
        return (i + 4).toString();
      }
    }
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '1655';
  }

  public solveSecond(): string {
    for (let i = 0; i < this.input.length; i++) {
        const current14 = this.input.substring(i, i + 14);
        // checks if current14 has a duplicate character
        if (!/(.).*\1/.test(current14)) {
          return (i + 14).toString();
        }
    }
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '2665';
  }
}

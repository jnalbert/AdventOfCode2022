import Puzzle from '../../types/AbstractPuzzle';

interface instruction {
    command: string;
    value?: string;
}

export default class ConcretePuzzle extends Puzzle {

    private getInstructions(): any[] {
        return this.input.split('\n').map((line) => {
            const commands = line.split(' ');
            if (commands[1]) {
                return {command: commands[0], value: commands[1]};
            }
            return {command: commands[0]};
        });
    }

  public solveFirst(): string {
    const instructions = this.getInstructions();
    let register = 1;
    let cycle = 0;


    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i].command;

        if (instruction === 'addx') {
            register += instructions[i].value;
        }

        console.log(instruction);
    }
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

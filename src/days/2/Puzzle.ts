import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {


  private getMovePoints(move: string): number {
    if (move === "R") return 1;
    if (move === "P") return 2;
    if (move === "S") return 3;
  }
  private getInputAsArray(): string[][] {
    return this.input.split('\n').map(game => game.split(' '))
  }  

  private convertToRPS(move: string): string {
    if (move === "A" || move === "X") return "R";
    if (move === "B" || move === "Y") return "P";
    if (move === "C" || move === "Z") return "S";
  }

  public solveFirst(): string {
    // Rock: FC: A, SC: X, 1pt
    // Paper: FC: B, SC: Y, 2pt
    // Scissors: FC: C, SC: Z, 3pt

    const games = this.getInputAsArray();

    let score = 0;

    games.forEach(game => {
        const elfMove = this.convertToRPS(game[0]);
        const myMove = this.convertToRPS(game[1]);
        
        score += this.getMovePoints(myMove)

        if (elfMove === myMove) score += 3;
        else if (elfMove === "R" && myMove === "P") score += 6;
        else if (elfMove === "P" && myMove === "S") score += 6;
        else if (elfMove === "S" && myMove === "R") score += 6;
    })

    return score.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '12535';
  }

  public solveSecond(): string {

    // map of moves to lose the game
    const loseMap = {
        "R": "S",
        "P": "R",
        "S": "P"
    }
    // map of moves to win the game
    const winMap = {
        "R": "P",
        "P": "S",
        "S": "R"
    }
    
    const games = this.getInputAsArray();
    let score = 0;

    games.forEach(game => {
        const elfMove = this.convertToRPS(game[0]);
        const definingMove = game[1]
        if (definingMove === "X") {
            // end round in a loss
           const myMove = loseMap[elfMove as keyof typeof loseMap];
           score += this.getMovePoints(myMove);
        } else if (definingMove === "Y") {
            // end round in a draw
            score += this.getMovePoints(elfMove)
            score += 3
        } else if (definingMove === "Z") {
            // end round in a win
            const myMove = winMap[elfMove as keyof typeof winMap];
            score += this.getMovePoints(myMove);
            score += 6
        }
    })

    return score.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '15457';
  }
}

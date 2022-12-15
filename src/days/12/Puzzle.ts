import Puzzle from '../../types/AbstractPuzzle';

const lowercase: string[] = Array.from(Array(26)).map((e, i) => i + 97).map(x => String.fromCharCode(x))

export default class ConcretePuzzle extends Puzzle {

    private getFloorMap(): string[][] {
        return this.input.split('\n').map((line) => line.split(''));
    }

    private paseMap(): { start: number[], end: number[], elevMap: number[][]} {
        let start: number[] = [];
        let end: number[] = [];
        const floorMap: string[][] = this.getFloorMap()
        const elevMap: number[][] = [];

        for (let i = 0; i < floorMap.length; i++) {
            for (let j = 0; j < floorMap[i].length; j++) {
                if (floorMap[i][j] === 'S') {
                    start = [i, j];
                    elevMap[i][j] = lowercase.indexOf("a");
                } else if (floorMap[i][j] === 'E') {
                    end = [i, j];
                    elevMap[i][j] = lowercase.indexOf("z");
                } else {
                    elevMap[i][j] = lowercase.indexOf(floorMap[i][j]);
                }
            }
        }
        return {start, end, elevMap}
    }

    // private compareLocations(location1: string[], location2: string[]): boolean {

    // }
    
  public solveFirst(): string {
    const {start, end, elevMap} = this.paseMap();
    let visitedStops = List

    // find the shortest path between S and E while only moving to a space that is one higher than the current position
    // if there is no path, return -1
    for (let i = 0; i < floorMap.length; i++) {
        for (let j = 0; j < floorMap[i].length; j++) {
            if (floorMap[i][j] === 'S') {
                // start = [i, j];
            }
            if (floorMap[i][j] === 'E') {
                // end = [i, j];
            }
        }
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

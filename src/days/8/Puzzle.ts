import Puzzle from "../../types/AbstractPuzzle"

export default class ConcretePuzzle extends Puzzle {
    private makeInputArray(): number[][] {
        // make the input into an array of arrays of numbers
        return this.input.split("\n").map((line) => {
            return line.split("").map((number) => {
                return Number(number)
            })
        })
    }

    public solveFirst(): string {
        const trees = this.makeInputArray()
        let visibleTrees = (trees.length - 2 + trees[0].length) * 2

        for (let i = 1; i < trees.length - 1; i++) {
            for (let j = 1; j < trees[i].length - 1; j++) {
                const tree = trees[i][j]
                // looks through the column if there is a tree that is a higher value
                let isVisible = {
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                }
                for (let k = 0; k < trees.length; k++) {
                    if (k < i && trees[k][j] >= tree) {
                        isVisible.top = false
                    }
                    if (k > i && trees[k][j] >= tree) {
                        isVisible.bottom = false
                    }
                }
                // looks through the row if there is a tree that is a higher value
                if (!(isVisible.top || isVisible.bottom)) {
                    for (let k = 0; k < trees[i].length; k++) {
                        if (k < j && trees[i][k] >= tree) {
                            isVisible.left = false
                        }
                        if (k > j && trees[i][k] >= tree) {
                            isVisible.right = false
                        }
                    }
                }
                visibleTrees += Object.values(isVisible).includes(true) ? 1 : 0
            }
        }

        return visibleTrees.toString()
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "1832"
    }

    public solveSecond(): string {
        const trees = this.makeInputArray()
        let highestScenicScore = 0

        for (let i = 1; i < trees.length - 1; i++) {
            for (let j = 1; j < trees[i].length - 1; j++) {
                const tree = trees[i][j]
                // looks through the column if there is a tree that is a higher value
                let treesSeen = {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }

                // go up the column
                for (let k = i - 1; k >= 0; k--) {
                    if (trees[k][j] < tree) {
                        treesSeen.top++
                    } else {
                        treesSeen.top++
                        break
                    }
                }
                // go down the column
                for (let k = i + 1; k < trees.length; k++) {
                    if (trees[k][j] < tree) {
                        treesSeen.bottom++
                    } else {
                        treesSeen.bottom++
                        break
                    }
                }

                    // go to the left in the row
                    for (let k = j - 1; k >= 0; k--) {
                        if (trees[i][k] < tree) {
                            treesSeen.left++
                        } else {
                            treesSeen.left++
                            break
                        }
                    }

                    // go to the right in the row
                    for (let k = j + 1; k < trees[i].length; k++) {
                        if (trees[i][k] < tree) {
                            treesSeen.right++
                        } else {
                            treesSeen.right++
                            break
                        }
                    }
                    // calculate the score
                    const score = treesSeen.top * treesSeen.bottom * treesSeen.left * treesSeen.right
                    highestScenicScore = Math.max(
                        highestScenicScore,
                        score
                    )
            }
        }
        return highestScenicScore.toString();
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        return "157320"
    }
}

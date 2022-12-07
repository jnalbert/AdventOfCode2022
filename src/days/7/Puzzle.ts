import Puzzle from "../../types/AbstractPuzzle"

export default class ConcretePuzzle extends Puzzle {
    private getInputAsArray(): string[] {
        return this.input.split("\n")
    }

    // make a function to find the value of each directory
    private getAllParentWithPath(path: string): string[] {
        const parentDirectories = [
            "/",
            ...path.slice(1).split("/").slice(0, -1),
        ]
        for (let i = 1; i < parentDirectories.length; i++) {
            parentDirectories[i] = `${parentDirectories[i - 1]}${
                parentDirectories[i]
            }/`
        }
        return parentDirectories
    }

    private makeFileSystem(): { [key: string]: number } {
        const commands = this.getInputAsArray()
        let currentPath = ["/"]
        const directories: { [key: string]: number } = { "/": 0 }

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i]
            // checks if its a command or a files
            if (command.includes("$")) {
                if (command.includes("cd")) {
                    const commandParts = command.split(" ")
                    const path = commandParts[2]
                    if (path === "..") {
                        // go back one directory
                        currentPath.length > 1 && currentPath.pop()
                    } else if (path === "/") {
                        currentPath = ["/"]
                    } else {
                        currentPath.push(`${path}/`)
                    }
                }
            } else {
                // its a file
                if (!(command.substring(0, 3) === "dir")) {
                    const commandParts = command.split(" ")
                    const fileSize = Number(commandParts[0])

                    const parentDirectories = this.getAllParentWithPath(
                        currentPath.join("")
                    )
                    // console.log(parentDirectories)
                    parentDirectories.forEach((dName) => {
                        directories[dName] = directories[dName]
                            ? directories[dName] + fileSize
                            : fileSize
                    })
                }
            }
        }
        return directories
    }

    public solveFirst(): string {
        // filter the object for only the values that are less than 10000
        const directories = this.makeFileSystem()
        const lowerDirectories = Object.keys(directories).filter(
            (d) => directories[d] <= 100000
        )
        return lowerDirectories
            .reduce((acc, curr) => acc + directories[curr], 0)
            .toString()
    }

    public getFirstExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 1;
        return "1845346"
    }

    public solveSecond(): string {
        const directories = this.makeFileSystem()
        // find the max value of all the directories
        const spaceNeeded = 30000000 - (70000000 - directories["/"])
        const bigEnoughDirectories = Object.values(directories).filter(
            (v) => v >= spaceNeeded
        )
        // return the minimum size directory
        return Math.min(...bigEnoughDirectories).toString();
    }

    public getSecondExpectedResult(): string {
        // RETURN EXPECTED SOLUTION FOR TEST 2;
        return "3636703"
    }
}

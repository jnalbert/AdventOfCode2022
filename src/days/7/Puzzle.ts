import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

    private getInputAsArray(): string[] {
        return this.input.split('\n');
    }

    // make a function to find the value of each directory
    private getAllParentWithPath(path: string): string[] {
        const parentDirectories = ["/", ...path.slice(1).split("/").slice(0, -1)]
        for (let i = 1; i < parentDirectories.length; i++) {
            parentDirectories[i] = `${parentDirectories[i - 1]}${parentDirectories[i]}/`;
        }
        return parentDirectories;
    }

  public solveFirst(): string {
    const commands = this.getInputAsArray();
    let currentPath = ["/"]
    const directories = {"/": 0 }

    for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        // checks if its a command or a files
        if (command.includes("$")) {
            if (command.includes("cd")) {
                const commandParts = command.split(" ");
                const path = commandParts[2];
                if (path === "..") {
                    // go back one directory
                    currentPath.length > 1 && currentPath.pop();
                } else if (path === "/") {
                    currentPath = ["/"];
                } else {
                    currentPath.push(`${path}/`);
                }
                // console.log(currentPath, command)
                
            }
        } else {
            // its a file
            if (!(command.substring(0, 3) === "dir")) {
                
                let directoryTotal = 0;
                // console.log(command)

                const commandParts = command.split(" ");
                const fileSize = Number(commandParts[0]);

                console.log(fileSize, currentPath)
            
                // const currentDirectory = directories.find(d => d.path === currentPath.join(""));
                // if (currentDirectory) {
                //     directory = currentDirectory;
                // } else {
                //     directories.push(directory);
                // }

                // let j = i
                // while (commands[j] && !commands[j].includes("$") ) {
                //     // console.log(commands[j], currentPath)
                //     if (!(commands[j].substring(0, 3) === "dir")) {
                //         // console.log(commands[j], currentPath)
                //         const commandParts = commands[j].split(" ");
                //         const fileSize = Number(commandParts[0]);
                //         directoryTotal += fileSize;
                //     }
                //     j++
                // }
                // // sub one to account for over for loop increment
                // i = j - 1
                // // console.log(directory)
                // // add the current value of this directory up the chain to all of the parent directories
                // const parentDirectories = this.getAllParentWithPath(currentPath.join(""))
                // parentDirectories.forEach((dName) => {
                //     console.log(dName)
                //     const parentDirectory = directories.find(d => d.path === `${dName}`);
                //     parentDirectory && (parentDirectory.dirSize += directoryTotal);
                // })
                // const currentDirect = directories.find(d => d.path === currentPath.join(""));
                // if (currentDirect) {
                //     currentDirect.dirSize += directoryTotal;
                // } else {
                //     directories.push(directory);
                // }
               
            }
        }
    }

    console.log(JSON.stringify(directories))

    // find the directories <= 100000 and add them
    // const lowerDirectories = directories.filter(d => d.dirSize <= 100000);
    // // return all of the directories added together
    // return lowerDirectories.reduce((acc, curr) => acc + curr.dirSize, 0).toString();
    return ""
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

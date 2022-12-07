import Puzzle from '../../types/AbstractPuzzle';

interface Directory {
    name: string;
    path: string;
    files: File[];
    directories: string[];
    dirSize: number;
}

interface File {
    name: string;
    size: number;
}

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
    let currentPath = "/"
    const directories: Directory[] = [];

    // base directory
    const baseDirectory: Directory = {
        name: "/",
        path: "/",
        files: [],
        dirSize: 0,
        directories: [],
    }
    directories.push(baseDirectory);

    for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        // checks if its a command or a files
        if (command.includes("$")) {
            if (command.includes("cd")) {
                const commandParts = command.split(" ");
                const path = commandParts[2];
                if (path === "..") {
                    // go back one directory
                    currentPath = currentPath.split("/").slice(0, -2).join("/") || "/";
                } else if (path === "/") {
                    currentPath = "/";
                } else {
                    currentPath = `${currentPath}${path}/`;
                }
                // console.log(path, currentPath)
                
            }
        } else {
            // its a directory
            // if (command.includes("dir")) {
            //     const commandParts = command.split(" ");
            //     const dirName = commandParts[1];
                
            //     const directory: Directory = {
            //         name: dirName,
            //         path: `${currentPath}${dirName}/`,
            //         files: [],
            //         dirSize: 0,
            //         directories: [],
            //     }

            //     !directories.find(d => d.path === `${currentPath}/${dirName}`) && directories.push(directory);

            //     const parentDirectories = this.getAllParentWithPath(currentPath)
            //     parentDirectories.forEach((dName) => {
            //         const parentDirectory = directories.find(d => d.path === `${dName}`);
            //         parentDirectory && parentDirectory.directories.push(directory.path);
            //     })

            // } else {
                if (!command.includes("dir")) {
                    const directory: Directory = {
                        name: currentPath.split("/").slice(-2)[0],
                        path: `${currentPath}`,
                        files: [],
                        dirSize: 0,
                        directories: [],
                    }
                    !directories.find(d => d.path === `${currentPath}`) && directories.push(directory);

                // its a file
                const commandParts = command.split(" ");
                const fileSize = Number(commandParts[0]);
                console.log(fileSize, "First")
                // const fileName = commandParts[1]

                // const file: File = {
                //     name: fileName,
                //     size: fileSize,
                // }

                // const currentDirectory = directories.find(d => d.path === currentPath);
                // if (currentDirectory) {
                //     currentDirectory.files.push(file);
                // }

               
                // add the current value of this directory up the chain to all of the parent directories
                const parentDirectories = this.getAllParentWithPath(currentPath)
                // console.log(parentDirectories, "Second")
                parentDirectories.forEach((dName) => {
                    console.log(dName, "Third")
                    const parentDirectory = directories.find(d => d.path === `${dName}`);
                    parentDirectory && (parentDirectory.dirSize += fileSize);
                })
            }
                
        }
    }

    // // find the size of each directory 
    // directories.forEach(d => {
    //     d.dirSize = this.findValueOfDirectory(directories, d);
    // })

    // console.log(JSON.stringify(directories))

    // find the directories <= 100000 and add them
    const lowerDirectories = directories.filter(d => d.dirSize <= 100000);
    // return all of the directories added together
    return lowerDirectories.reduce((acc, curr) => acc + curr.dirSize, 0).toString();
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

# fs-assistant

fs-assistant is a simple library that gives you recursive folder copying, simplified file overrides and promisified fs functions.

###  replaceStringInFile (pathToFile: string, stringPattern: RegExp | string, newString: string) => Promise<void>
Replaces a string in a file that matches the pattern with the new given string.

### copyDir (pathToDir: string, pathToNewDir: string) => Promise<void>
Recursively copies all files from a directory to another.

### readFile (fileLocation: string) => Promise<string>
Promisified version of fs readFile.

### writeFile (newFileLocation: string, contents:any) => Promise<void>
Promisified version of fs writeFile.

### copyFile (from: string, to: string) => Promise<void>
Promisified version of fs copyFile.

### makeDir (location: string) => Promise<void>
Promisified version of fs makeDir.
# fs-assistant

![](https://badgen.net/npm/v/fs-assistant)
![](https://img.shields.io/bundlephobia/min/fs-assistant.svg)
![](https://img.shields.io/npm/types/fs-assistant.svg)
![](https://img.shields.io/npm/l/fs-assistant.svg)
![](https://img.shields.io/npm/dt/fs-assistant.svg)


fs-assistant is a simple library that gives you recursive folder copying, simplified file overrides and promisified fs functions.

```javascript
replaceStringInFile (pathToFile: string, stringPattern: RegExp | string, newString: string) => Promise<void>
```
Replaces a string in a file that matches the pattern with the new given string.

```javascript
copyDir (pathToDir: string, pathToNewDir: string) => Promise<void>
```
Recursively copies all files from a directory to another.

```javascript
readFile (fileLocation: string) => Promise<string>
```
Promisified version of fs readFile.

```javascript
writeFile (newFileLocation: string, contents:any) => Promise<void>
```
Promisified version of fs writeFile.

```javascript
copyFile (from: string, to: string) => Promise<void>
```
Promisified version of fs copyFile.

```javascript
makeDir (location: string) => Promise<void>
```
Promisified version of fs makeDir.

```javascript
deleteFile (location: string) => Promise<void>
```
Deletes the specified file.

```javascript
renameFile (fileLocation: string, newFileName: string) => Promise<void>
```
Renames the specified file

```javascript
isPath (stringToCheck: string) => boolean
```
Checks if the given string is a valid path. You can check all covered cases [here](https://github.com/SvetozarMateev/fs-assistant/blob/master/test/integration/isPath.spec.ts).
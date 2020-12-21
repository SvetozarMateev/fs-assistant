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

```javascript
flattenDir (dirLocation: string, newLocation: string) => Promise<void>
```
Moves all files from a directory (recursively) to a new directory.
For example if you have the directory `./myFiles` with a file `./myFiles/myFile.txt` and a nested directory `./myFiles/nestedFiles` which contains `./myFiles/nestedFiles/nestedFile.txt` the flattenDir function will move both files to the same level in a new output directory.

```javascript
getFilesInDir(dirLocation: string) => Promise<FileDetails[]>
```
Returns an array with all file names and locations in a directory (recursively). Note that the location property in FileDetails represents the path + the name of the file.

```javascript
readDir(dir: string) => Promise<string[]>
```
The promisified version of fs.readdir.

```javascript
getDirsInDir(dirLocation: string) => Promise<FileDetails[]>
```
Returns an array with all sub directories of a directory.

```javascript
getFilesInDir(dirLocation: string) => Promise<DirectoryDetails[]>
```
Returns an array with all items represented either as FileDetails or as DirectoryDetails.

```javascript
getFileSizeInBytes: (location: string) => Promise<number>;
```
Returns the file size in bytes.

```javascript
    getDirSizeInBytes: (location: string) => Promise<number>;
```
Returns the directory size in bytes.

```javascript
    delDir: (location: string) => Promise<void>;
```
Deletes the directory recursively.

```javascript
    existsSync: (location: string) => boolean;
```
Equivalent to `fs.existsSync()`.

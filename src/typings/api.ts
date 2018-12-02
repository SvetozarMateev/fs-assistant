export interface AssistantAPI {
    replaceStringInFile: (pathToFile: string, stringPattern: RegExp | string, newString: string) => Promise<void>;
    copyDir: (pathToDir: string, pathToNewDir: string) => Promise<void>;
    readFile: (fileLocation: string) => Promise<string>;
    writeFile: (newFileLocation: string, contents: any) => Promise<void>;
    copyFile: (from: string, to: string) => Promise<void>;
    makeDir: (location: string) => Promise<void>;
    deleteFile: (location: string) => Promise<void>;
    renameFile: (fileLocation: string, newFileName: string) => Promise<void>;
} 

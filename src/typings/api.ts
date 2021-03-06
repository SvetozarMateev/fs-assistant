export interface AssistantAPI {
    replaceStringInFile: (pathToFile: string, stringPattern: RegExp | string, newString: string) => Promise<void>;
    copyDir: (pathToDir: string, pathToNewDir: string) => Promise<void>;
    readFile: (fileLocation: string) => Promise<string>;
    writeFile: (newFileLocation: string, contents: any) => Promise<void>;
    copyFile: (from: string, to: string) => Promise<void>;
    makeDir: (location: string) => Promise<void>;
    deleteFile: (location: string) => Promise<void>;
    renameFile: (fileLocation: string, newFileName: string) => Promise<void>;
    isPath: (stringToCheck: string) => boolean;
    getFilesInDir: (dirLocation: string) => Promise<FileDetails[]>;
    getDirsInDir: (dirLocation: string) => Promise<DirectoryDetails[]>;
    getItemsInDir: (dirLocation: string) => Promise<FileSystemItemDetails[]>;
    flattenDir: (dirLocations: string, newDirLocations: string) => Promise<void>;
    readDir: (dir: string) => Promise<string[]>;
    getFileSizeInBytes: (location: string) => Promise<number>;
    getDirSizeInBytes: (location: string) => Promise<number>;
    delDir: (location: string) => Promise<void>;
    existsSync: (location: string) => boolean;
}

export interface FileDetails {
    name: string;
    location: string;
}

export interface DirectoryDetails {
    name: string;
    location: string;
    files: FileDetails[];
}

export interface FileSystemItemDetails {
    type: "File" | "Directory";
    location: string;
    name: string;
    files?: FileDetails[];
}

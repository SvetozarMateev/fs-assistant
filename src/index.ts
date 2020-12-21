import pfs from "./promisified-fs";
import { AssistantAPI } from "./typings/api";

class Assistant implements AssistantAPI {

    public replaceStringInFile = async (pathToFile: string, stringPattern: RegExp | string, newString: string) => {
        if (!pathToFile) {
            throw new Error("The file location has to be specified");
        }
        if (!stringPattern) {
            throw new Error("The string pattern has to be specified");
        }

        newString = newString || "";

        const file = await pfs.readFile(pathToFile);

        const newContent = file.replace(stringPattern, newString);

        await pfs.writeFile(pathToFile, newContent);
    }

    public copyDir = async (pathToDir: string, pathToNewDir: string) => {
        if (!pathToDir) {
            throw new Error("Path to the source directory must be specified");
        }

        if (!pathToNewDir) {
            throw new Error("Path to the output directory must be specified");
        }
        await pfs.copyDir(pathToDir, pathToNewDir);
    }

    public readFile = async (fileLocation: string) => {
        if (!fileLocation) {
            throw new Error("The file location must be specified");
        }

        const contents = await pfs.readFile(fileLocation);

        return contents;
    }

    public writeFile = async (newFileLocation: string, contents: any) => {
        if (!newFileLocation) {
            throw new Error("The new  file location must be specified");
        }
        await pfs.writeFile(newFileLocation, contents);
    }

    public copyFile = async (from: string, to: string) => {
        if (!from) {
            throw new Error("The source file location must be specified");
        }

        if (!to) {
            throw new Error("The output file location must be specified");
        }

        await pfs.copyFile(from, to);
    }

    public makeDir = async (location: string) => {
        if (!location) {
            throw new Error(`The location ${location} is not valid.`);
        }

        await pfs.makeDir(location);
    }

    public deleteFile = async (location: string) => {
        if (!location) {
            throw new Error(`The location ${location} is not valid.`);
        }

        await pfs.deleteFile(location);
    }

    public renameFile = async (fileLocation: string, newFileName: string) => {
        if (!fileLocation) {
            throw new Error(`The file is missing`);
        }

        if (!newFileName) {
            throw new Error(`The new file name is missing`);
        }

        await pfs.renameFile(fileLocation, newFileName);
    }

    public isPath = (stringToCheck: string) => {
        if (typeof stringToCheck !== "string") {
            return false;
        }

        return pfs.isPath(stringToCheck);
    }

    public getFilesInDir = async (dirLocation: string) => {
        if (typeof dirLocation !== "string") {
            throw new Error(`The provided path"${dirLocation}" is invalid`);
        }
        return await pfs.getAllFilesInDir(dirLocation);
    }

    public flattenDir = async (dirLocation: string, newDirLocation: string) => {
        if (typeof dirLocation !== "string") {
            throw new Error(`The provided path"${dirLocation}" is invalid`);
        }

        if (typeof newDirLocation !== "string") {
            throw new Error(`The provided path"${newDirLocation}" is invalid`);
        }

        await pfs.flattenDir(dirLocation, newDirLocation);
    }

    public readDir = async (dir: string) => {
        if (typeof dir !== "string") {
            throw new Error(`The ${dir} argument should be a string`);
        }

        return pfs.readDir(dir);
    }

    public getDirsInDir = async (dir: string) => {
        if (typeof dir !== "string") {
            throw new Error(`The dir argument must be string not ${typeof dir}`);
        }

        return await pfs.getDirsInDir(dir);
    }

    public getItemsInDir = async (dir: string) => {
        if (typeof dir !== "string") {
            throw new Error(`The dir argument must be string not ${typeof dir}`);
        }

        return await pfs.getItemsInDir(dir);
    }

    public getFileSizeInBytes = async (location: string) => {
        if (typeof location !== "string") {
            throw new Error(`The provided path"${location}" is invalid`);
        }

        return await pfs.getFileSizeInBytes(location);
    }

    public getDirSizeInBytes = async (location: string) => {
        if (typeof location !== "string") {
            throw new Error(`The provided path"${location}" is invalid`);
        }

        return await pfs.getDirSizeInBytes(location);
    }

    public delDir = async (location: string) => {
        if (typeof location !== "string") {
            throw new Error(`The location argument must be string not ${typeof location}`);
        }

        return await pfs.delDir(location);
    }

    public existsSync = (location: string) => {
        if (typeof location !== "string") {
            throw new Error(`The location argument must be string not ${typeof location}`);
        }

        return pfs.existsSync(location);
    }
}

export default new Assistant();

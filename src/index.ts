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
        return contents
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

    public deleteFile = async (location:string)=>{
        if (!location) {
            throw new Error(`The location ${location} is not valid.`);
        }

        await pfs.deleteFile(location);
    }
}

export default new Assistant();
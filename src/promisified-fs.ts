import {
    readFile,
    writeFile,
    existsSync,
    unlink,
    mkdir,
    copyFile,
    readdir,
    lstatSync
} from "fs";
import { join, resolve, dirname } from "path";
import { FileDetails, FileSystemItemDetails, DirectoryDetails } from "./typings/api";

class PromisifiedFs {

    public readDir(pathToDir: string): Promise<string[]> {
        return new Promise((res, rej) => {
            readdir(pathToDir, (err, files) => {
                if (err) {
                    rej(err);
                }

                res(files);
            });
        });
    }

    public readFile(pathToFile: string): Promise<string> {
        return new Promise((res, rej) => {
            readFile(pathToFile, "utf-8", (err: Error, data: string) => {
                if (err) {
                    return rej(err);
                }
                return res(data);
            });
        });
    }

    public writeFile(pathToFile: string, contents: any): Promise<void> {
        return new Promise((res, rej) => {
            writeFile(pathToFile, contents, (err: Error) => {
                if (err) {
                    return rej(err);
                }

                return res();
            });
        });
    }

    public async copyDir(entryPoint: string, outputLocation: string) {
        if (!existsSync(resolve(outputLocation))) {
            await this.makeDir(resolve(outputLocation));
        }

        const traverseDirs = async (currLocation: string, outputLocationFull: string) => {
            const files = await this.readDir(currLocation);
            const traversePromises = files.map(async (dir) => {
                const currLocationFull = resolve(currLocation, dir);
                const currLocationDist = resolve(outputLocationFull, dir);
                if (lstatSync(currLocationFull).isDirectory()) {
                    if (!existsSync(currLocationDist)) {
                        await this.makeDir(currLocationDist);
                    }
                    await traverseDirs(currLocationFull, currLocationDist);
                } else {
                    await this.copyFile(currLocationFull, currLocationDist);
                }
            });

            await Promise.all(traversePromises);
        };

        await traverseDirs(entryPoint, resolve(outputLocation));
    }

    public async makeDir(location: string) {
        return new Promise((res, rej) => {
            mkdir(location, (err: Error) => {
                if (err) {
                    rej(err);
                }
                res();
            });
        });
    }

    public async copyFile(from: string, to: string) {
        return new Promise((res, rej) => {
            copyFile(from, to, (err: Error) => {
                if (err) {
                    return rej(err);
                }
                res();
            });
        });

    }

    public async deleteFile(location: string) {
        return new Promise((res, rej) => {
            unlink(location, (err: Error) => {
                if (err) {
                    rej(err);
                }
                res();
            });
        });
    }

    public async renameFile(fileLocation: string, newName: string) {
        const newLocation = join(dirname(fileLocation), newName);
        await this.copyFile(fileLocation, newLocation);
        await this.deleteFile(fileLocation);
    }

    public isPath(stringToCheck: string): boolean {

        // checking for paths like . ..
        if (/^\.{1,2}$/.test(stringToCheck)) {
            return true;
        }
        // checking for paths like // \\ ////
        if (/^[\\\/]+$/.test(stringToCheck)) {
            return false;
        }
        // checking if the path contains too many dots
        if (/\.{3,}/.test(stringToCheck)) {
            return false;
        }
        // checking for paths that are just a file like myFile.txt, my file.txt or just folders like desktop
        if (/^[a-zA-Z1-9 %&]+(\.[a-zA-Z1-9]+)*$/.test(stringToCheck)) {
            return true;
        }
        // all normal paths
        return /^([.A-Za-z1-9% ]*[\\\/]){1,}([a-zA-Z 1-9%&]+(\.[a-zA-Z1-9]+)*)?$/.test(stringToCheck);
    }

    public async getAllFilesInDir(location: string): Promise<FileDetails[]> {
        // const files: FileDetails[] = [];

        // const traverseDirs = async (currLocation: string) => {
        //     const currContents = await this.readDir(currLocation);
        //     const traversalPromises = currContents.map(async (dir) => {
        //         const currLocationFull = resolve(currLocation, dir);
        //         if (lstatSync(currLocationFull).isDirectory()) {
        //             await traverseDirs(currLocationFull);
        //         } else {
        //             files.push({
        //                 name: dir,
        //                 location: currLocationFull
        //             });
        //         }
        //     });
        //     await Promise.all(traversalPromises);
        // };

        // await traverseDirs(location);

        // return files;

        const allItems = await this.getItemsInDir(location);

        return allItems.filter((i) => i.type === "File");
    }

    public async getDirsInDir(location: string): Promise<DirectoryDetails[]> {
        const allItems = await this.getItemsInDir(location);

        return allItems.filter((i) => i.type === "Directory").map((i) => {
            return {
                name: i.name,
                files: i.files || [],
                location: i.location
            };
        });
    }

    public async getItemsInDir(location: string): Promise<FileSystemItemDetails[]> {
        const items: FileSystemItemDetails[] = [];

        const traverseDirs = async (currLocation: string) => {
            const currContents = await this.readDir(currLocation);
            const traversalPromises = currContents.map(async (dir) => {
                const currLocationFull = resolve(currLocation, dir);
                if (lstatSync(currLocationFull).isDirectory()) {
                    items.push({
                        type: "Directory",
                        name: dir,
                        location: currLocationFull,
                        files: []
                    });
                    await traverseDirs(currLocationFull);
                } else {
                    const currFsItem: FileSystemItemDetails = {
                        name: dir,
                        location: currLocationFull,
                        type: "File"
                    };

                    items.push(currFsItem);

                    const parentDir = items.find((i) => i.location === dirname(currLocationFull));
                    if (parentDir && parentDir.files) {
                        parentDir.files.push({
                            name: dir,
                            location: currLocationFull
                        });
                    }
                }
            });
            await Promise.all(traversalPromises);
        };

        await traverseDirs(location);

        return items;
    }

    public async flattenDir(location: string, newLocation: string) {
        const allFiles = await this.getAllFilesInDir(location);
        if (!existsSync(newLocation)) {
            await this.makeDir(newLocation);
        }

        const copyFiles = allFiles.map((f) => {
            return this.copyFile(f.location, resolve(newLocation, f.name));
        });

        await Promise.all(copyFiles);
    }
}

export default new PromisifiedFs();

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


class PromisifiedFs {

    public readFile(pathToFile: string): Promise<string> {
        return new Promise((res, rej) => {
            readFile(pathToFile, "utf-8", (err, data) => {
                if (err) {
                    return rej(err);
                }
                return res(data);
            })
        })
    }

    public writeFile(pathToFile: string, contents: any): Promise<void> {
        return new Promise((res, rej) => {
            writeFile(pathToFile, contents, (err) => {
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

        const traverseDirs = async (currLocation, outputLocationFull) => {
            await readdir(currLocation, async (err, data) => {
                if (err) {
                    throw new Error(err.message);
                }
                await data.forEach(async (dir) => {
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
            });
        };

        await traverseDirs(entryPoint, resolve(outputLocation));
    }

    public async makeDir(location: string) {
        return new Promise((res, rej) => {
            mkdir(location, (err) => {
                if (err) {
                    rej(err);
                }
                console.log(`Made dir ${location}`);
                res();
            });
        });
    }

    public async copyFile(from: string, to: string) {
        return new Promise((res, rej) => {
            copyFile(from, to, (err) => {
                if (err) {
                    return rej(err);
                }
                res();
            });
        });

    }

    public async deleteFile(location: string) {
        return new Promise((res, rej) => {
            unlink(location, (err) => {
                if (err) {
                    rej(err);
                }
                res();
            })
        })
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
        if(/^[\\\/]+$/.test(stringToCheck)){
            return false;
        }
        // checking if the path contains too many dots
        if(/\.{3,}/.test(stringToCheck)){
            return false;
        }
        // checking for paths that are just a file like myFile.txt, my file.txt or just folders like desktop
        if(/^[a-zA-Z1-9 %&]+(\.[a-zA-Z1-9]+)*$/.test(stringToCheck)){
            return true;
        }
        // all normal paths
        return /^([.A-Za-z1-9% ]*[\\\/]){1,}([a-zA-Z 1-9%&]+(\.[a-zA-Z1-9]+)*)?$/.test(stringToCheck);
    }
}

export default new PromisifiedFs();
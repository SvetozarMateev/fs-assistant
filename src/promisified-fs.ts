import * as fs from "fs";
import * as path from "path";


class PromisifiedFs {
    
    public readFile(pathToFile: string): Promise<string> {
        return new Promise((res, rej) => {
            fs.readFile(pathToFile, "utf-8", (err, data) => {
                if (err) {
                    return rej(err);
                }
                return res(data);
            })
        })
    }

    public writeFile(pathToFile: string, contents: any): Promise<void> {
        return new Promise((res, rej) => {
            fs.writeFile(pathToFile, contents, (err) => {
                if (err) {
                    return rej(err);
                }

                return res();
            });
        });
    }

    public async copyDir(entryPoint: string, outputLocation: string) {
        if (!fs.existsSync(path.resolve(outputLocation))) {
            await this.makeDir(path.resolve( outputLocation));
        }
        const traverseDirs = async (currLocation, outputLocationFull) => {
            await fs.readdir(currLocation, async (err, data) => {
                if (err) {
                    throw new Error(err.message);
                }
                await data.forEach(async (dir) => {
                    const currLocationFull = path.resolve(currLocation, dir);
                    const currLocationDist = path.resolve(outputLocationFull, dir);
                    if (fs.lstatSync(currLocationFull).isDirectory()) {
                        if (!fs.existsSync(currLocationDist)) {
                            await this.makeDir(currLocationDist);
                        }
                        await traverseDirs(currLocationFull, currLocationDist);
                    } else {
                        await this.copyFile(currLocationFull, currLocationDist);
                    }
                });
            });
        };

        await traverseDirs(entryPoint, path.resolve(outputLocation));
    }

    public async makeDir(location: string) {
        return new Promise((res, rej) => {
            fs.mkdir(location, (err) => {
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
            fs.copyFile(from, to, (err) => {
                if (err) {
                    return rej(err);
                }
                res();
            });
        });

    }
}

export default new PromisifiedFs();
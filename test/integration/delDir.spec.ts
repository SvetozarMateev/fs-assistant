import { resolve } from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import assistant from "../../src/index";
import { expect } from "chai";
import rimraf = require("rimraf");

describe("delDir()", () => {
    const topMostDirPath = resolve("./first");
    const testFilePath1 = resolve("./first/someFile.txt");
    const testFilePath2 = resolve("./first/second/someFile.txt");
    const testFilePath3 = resolve("./first/second/third/someFile.txt");

    beforeEach(() => {
        mkdirSync(topMostDirPath);
        mkdirSync("./first/second");
        mkdirSync("./first/secondAndAHalf");
        mkdirSync("./first/second/third");
        mkdirSync("./first/second/third/fourth");

        writeFileSync(testFilePath1, "");
        writeFileSync(testFilePath2, "");
        writeFileSync(testFilePath3, "");
    });

    afterEach((done) => {
        rimraf(topMostDirPath, {}, (err) => {
            done(err);
        });
    })

    it("Should delete the the directory when the provided location is correct", async () => {
        await assistant.delDir(topMostDirPath);

        const dirExists = existsSync(topMostDirPath);

        expect(dirExists).to.be.false;
    });

    it("Should throw an error when the provided location is undefined", (done) => {
        assistant.delDir((undefined as any)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it("Should throw an error when the provided location is not a string", (done) => {
        assistant.delDir(({} as any)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it("Should throw an error when the given path is a file", (done) => {
        const newFile = resolve("./testDir.txt");
        writeFileSync(newFile, "");

        assistant.delDir(newFile).then(() => {
            done("Should throw an error");
            rimraf(newFile, () => { });
        }).catch(() => {
            done();
            rimraf(newFile, () => { });
        });
    });
})
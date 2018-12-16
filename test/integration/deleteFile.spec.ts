import { resolve, dirname, basename } from "path";
import { writeFileSync, unlinkSync, readdirSync, fstat, mkdirSync } from "fs";
import assistant from "../../src/index";
import { expect } from "chai";
import rimraf = require("rimraf");

describe("deleteFile()", () => {
    const testFilePath = resolve("./someFile.txt");
    beforeEach(() => {
        writeFileSync(testFilePath, "");
    })

    afterEach(() => {
        try {
            unlinkSync(testFilePath);
        } catch (error) {

        }

    })

    it("Should delete the specified file when the provided location is correct", async () => {
        await assistant.deleteFile(testFilePath);

        const testFileDir = dirname(testFilePath);
        const testFileName = basename(testFilePath);

        const filesInDir = readdirSync(testFileDir);
        const isFileStillInDir = filesInDir.some((f) => f === testFileName);

        expect(isFileStillInDir).to.be.false;
    });

    it("Should throw an error when the provided location is undefined", (done) => {
        assistant.deleteFile((undefined as any)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it("Should throw an error when the provided location is not a string", (done) => {
        assistant.deleteFile(({} as any)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it("Should throw an error when the given path is a directory", (done) => {
        const newDir = resolve("./testDir");
        mkdirSync(newDir);

        assistant.deleteFile(newDir).then(() => {
            done("Should throw an error");
            rimraf(newDir, () => { });
        }).catch(() => {
            done();
            rimraf(newDir, () => { });
        });
    });
})
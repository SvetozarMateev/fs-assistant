import { mkdirSync, writeFileSync, readdirSync, readFileSync } from "fs";
import { resolve, basename } from "path";
import rimraf = require("rimraf");
import assistant from "../../src/index";
import { expect } from "chai";

describe("getFilesInDir()", () => {
    const outterDirLocation = resolve("./testDir");
    const fileInOutterDir = resolve(outterDirLocation, "fileOne.txt");

    const innerDirLocation = resolve(outterDirLocation, "./inner");
    const fileInInnerDir = resolve(innerDirLocation, "fileTwo.txt");

    before(() => {
        mkdirSync(outterDirLocation);
        writeFileSync(fileInOutterDir, "");

        mkdirSync(innerDirLocation);
        writeFileSync(fileInInnerDir, "");
    })

    after((done) => {
        rimraf(outterDirLocation, (err) => {
            done(err);
        });
    })

    it("Should return an array of FileDetails when the parameters are correct", async () => {
        const filesInDir = await assistant.getFilesInDir(outterDirLocation);

        expect(filesInDir).be.an("array");

        filesInDir.forEach((fd) => {
            expect(fd.name).to.be.a("string");
            expect(fd.location).to.be.a("string");
        })
    })

    it("Should return an array with the correct FileDetails when the parameters are correct", async () => {
        const filesInDir = await assistant.getFilesInDir(outterDirLocation);

        expect(filesInDir.length).equal(2);

        const containsOutterFile = filesInDir.some((fd) => {
            return fd.name === basename(fileInOutterDir) && fd.location === fileInOutterDir;
        });

        const containsInnerFile = filesInDir.some((fd) => {
            return fd.name === basename(fileInInnerDir) && fd.location === fileInInnerDir;
        });

        expect(containsInnerFile).to.be.true;
        expect(containsOutterFile).to.be.true;
    })

    it("Should throw an error when the directory location is undefined", (done) => {
        assistant.getFilesInDir((undefined as unknown) as string).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        })
    })

    it("Should throw an error when the directory location is invalid", (done) => {
        assistant.getFilesInDir(({} as unknown) as string).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        })
    })

    it("Should throw an error when the directory does not exist", (done) => {
        assistant.getFilesInDir('./doesNotExist').then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        })
    })
})
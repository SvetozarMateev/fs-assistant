import { mkdirSync, writeFileSync, readdirSync, readFileSync } from "fs";
import { resolve, basename } from "path";
import rimraf = require("rimraf");
import assistant from "../../src/index";
import { expect } from "chai";

describe("flattenDir()", () => {
    const outterDirLocation = resolve("./testDir");
    const fileInOutterDir = resolve(outterDirLocation, "fileOne.txt");
    const outterFileContent = "First level";

    const innerDirLocation = resolve(outterDirLocation, "./inner");
    const fileInInnerDir = resolve(innerDirLocation, "fileTwo.txt");
    const innerFileContent = "Second level";

    const resultDir = resolve("./resultDir");

    before(() => {
        mkdirSync(outterDirLocation);
        writeFileSync(fileInOutterDir, outterFileContent);

        mkdirSync(innerDirLocation);
        writeFileSync(fileInInnerDir, innerFileContent);
    })

    afterEach((done) => {
        rimraf(resultDir, (err) => {
            done(err);
        });
    });

    after((done) => {
        rimraf(outterDirLocation, (err) => {
            done(err);
        });
    })

    it("Should create all files to a new directory from the given directory when the arguments are correct", async () => {
        await assistant.flattenDir(outterDirLocation, resultDir);

        const filesInResultDir = readdirSync(resultDir);

        const containsOutterFile = filesInResultDir.some(f => f === basename(fileInOutterDir));
        const containsInnerFile = filesInResultDir.some(f => f === basename(fileInInnerDir));

        expect(containsInnerFile).to.be.true;
        expect(containsOutterFile).to.be.true;
    });

    it("Should create all files with the same content in a new directory when the arguments are correct", async () => {
        await assistant.flattenDir(outterDirLocation, resultDir);

        const resultOutterFileContent = readFileSync(resolve(resultDir, basename(fileInOutterDir)), 'utf-8');
        const resultInnerFileContent = readFileSync(resolve(resultDir, basename(fileInInnerDir)), 'utf-8');

        expect(resultOutterFileContent).to.equal(outterFileContent);
        expect(resultInnerFileContent).to.be.equal(innerFileContent);
    });

    it("Should throw an error when first argument is not a correct path ", (done) => {
        assistant.flattenDir("./notReal", resultDir).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        })
    })

    it("Should throw an error when the first argument is undefined", (done) => {
        assistant.flattenDir((undefined as any), resultDir).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        })
    })

    it("Should throw an error when second first argument is undefined", (done) => {
        assistant.flattenDir(outterDirLocation, (undefined as any)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        })
    })
})
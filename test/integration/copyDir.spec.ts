import { resolve, basename } from "path";
import { mkdirSync, writeFileSync, readdirSync, readFile, readFileSync } from "fs";
const rimraf = require("rimraf");
import assistant from "../../src/index";
import { expect } from "chai";

describe("copyDir()", () => {

    const outterDirLocation = resolve("./testDir");
    const fileInOutterDir = resolve(outterDirLocation, "fileOne.txt");
    const outterFileContent = "First level";

    const innerDirLocation = resolve(outterDirLocation, "./inner");
    const fileInInnerDir = resolve(innerDirLocation, "fileTwo.txt");
    const innerFileContent = "Second level";

    const resultDir = resolve("./resultDir");

    before(() => {
        mkdirSync(outterDirLocation);
        mkdirSync(innerDirLocation);
        writeFileSync(fileInOutterDir, outterFileContent);
        writeFileSync(fileInInnerDir, innerFileContent);
    })

    afterEach((done) => {
        rimraf(resultDir, done);
    })

    after((done) => {
        rimraf(outterDirLocation, done);
    });

    it("Should copy all files and directories from the specified location when the parameters are correct", async () => {
        await assistant.copyDir(outterDirLocation, resultDir);
        const itemsInResultDir = readdirSync(resultDir);

        const containsInnerDir = itemsInResultDir.some((i) => i === basename(innerDirLocation));
        const containsOutterFile = itemsInResultDir.some((i) => i === basename(fileInOutterDir));

        expect(containsInnerDir).to.be.true;
        expect(containsOutterFile).to.be.true;

        const itemsInInnerDirInResult = readdirSync(resolve(resultDir, basename(innerDirLocation)));

        const containsInnerFile = itemsInInnerDirInResult.some((i) => i === basename(fileInInnerDir));

        expect(containsInnerFile).to.be.true;
    });

    it("Should copy all files from the specified location with the correct content when the parameters are correct", async () => {
        await assistant.copyDir(outterDirLocation, resultDir);

        const outterFileResultContent = readFileSync(resolve(resultDir, basename(fileInOutterDir)), 'utf-8');

        expect(outterFileResultContent).to.equal(outterFileContent);

        const innerFileResultContent = readFileSync(
            resolve(resultDir,
                basename(innerDirLocation),
                basename(fileInInnerDir)),
            'utf-8');

        expect(innerFileResultContent).to.equal(innerFileResultContent);
    });

    it('Should throw an error when the first argument is undefined', (done) => {
        const undefinedString: unknown = undefined;
        assistant.copyDir(undefinedString as string, resultDir).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it('Should throw an error when the first argument is invalid', (done) => {
        assistant.copyDir(({} as string), resultDir).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it('Should throw an error when the first argument is a non existing path', (done) => {
        assistant.copyDir('./doesNotExist', resultDir).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it('Should throw an error when the second argument is undefined', (done) => {
        assistant.copyDir(outterDirLocation, ((undefined as unknown) as string)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

    it('Should throw an error when the second argument is invalid', (done) => {
        assistant.copyDir(outterDirLocation, ({} as string)).then(() => {
            done("Should throw an error");
        }).catch(() => {
            done();
        });
    });

});
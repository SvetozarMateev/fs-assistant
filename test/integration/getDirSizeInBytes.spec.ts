import assistant from "../../src/index";
import { expect } from "chai";
import { resolve } from "path";

describe("getDirSizeInBytes() Should", () => {
    const pathToTestDirSingleLevel = resolve(__dirname, "./testFiles/singleLevel");
    const pathToTestDirDoubleLevel = resolve(__dirname, "./testFiles/doubleLevel");
    const pathToTestDirTripleLevel = resolve(__dirname, "./testFiles/tripleLevel");

    Array.from([pathToTestDirSingleLevel, pathToTestDirDoubleLevel, pathToTestDirDoubleLevel]).forEach((path) => {
        it(`resolve the promise when the path is ${path}`, async () => {
            await assistant.getDirSizeInBytes(path);
        });

        it(`return a number when the path is ${path}`, async () => {
            const result = await assistant.getDirSizeInBytes(path);

            expect(typeof result).to.eql("number");
        });
    });


    it("return the correct size when the dir is single level", async () => {
        const result = await assistant.getDirSizeInBytes(pathToTestDirSingleLevel);

        expect(result).to.eql(10);
    });

    it("return the correct size when the dir is double level", async () => {
        const result = await assistant.getDirSizeInBytes(pathToTestDirDoubleLevel);

        expect(result).to.eql(20);
    });

    it("return the correct size when the dir is triple level", async () => {
        const result = await assistant.getDirSizeInBytes(pathToTestDirTripleLevel);

        expect(result).to.eql(30);
    });

    Array.from([12, {}, [], undefined, null, ""]).forEach((input) => {
        it(`reject the promise when the path argument is ${input}`, (done) => {
            assistant.getDirSizeInBytes(input as any)
                .then(() => done("Should not resolve"))
                .catch(() => done());
        });
    });

});
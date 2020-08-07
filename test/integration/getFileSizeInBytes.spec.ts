import assistant from "../../src/index";
import { expect } from "chai";
import { resolve } from "path";


describe("getFileSizeInBytes() Should", () => {

    const pathToTestFile = resolve(__dirname, "./testFiles/10Bytes.txt");

    it("resolve the promise when the path is correct", async () => {
        await assistant.getFileSizeInBytes(pathToTestFile);
    });

    it("return a number when the path is correct", async () => {
        const result = await assistant.getFileSizeInBytes(pathToTestFile);

        expect(typeof result).to.eql("number");
    });

    it("return the correct size", async () => {
        const result = await assistant.getFileSizeInBytes(pathToTestFile);

        expect(result).to.eql(10);
    });

    Array.from([12, {}, [], undefined, null, ""]).forEach((input) => {
        it(`reject the promise when the path argument is ${input}`, (done) => {
            assistant.getFileSizeInBytes(input as any)
                .then(() => done("Should not resolve"))
                .catch(() => done());
        });
    });

});
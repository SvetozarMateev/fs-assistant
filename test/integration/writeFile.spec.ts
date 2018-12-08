import { resolve, dirname, basename } from "path";
import { unlinkSync, readdirSync, readFileSync } from "fs";
import assistant from "../../src/index";
import { expect } from "chai";
import { doesNotReject } from "assert";

describe("writeFile()", () => {

    const newFileLocation = resolve("./file.txt");
    const newFileContent = "Random file content";

    afterEach(() => {
        try {
            unlinkSync(newFileLocation);
        } catch (error) {

        }
    })

    it("Should resolve its promise when the parameters are correct", async () => {
        await assistant.writeFile(newFileLocation, newFileContent);
    })

    it("Should create a file in the right location when the parameters are correct", async () => {
        await assistant.writeFile(newFileLocation, newFileContent);
        const files = readdirSync(dirname(newFileLocation));
        expect(files.some((f) => f === basename(newFileLocation))).to.be.true;
    })

    it("Should create a file with the correct content when the parameters are correct", async () => {
        await assistant.writeFile(newFileLocation, newFileContent);
        const fileContent = readFileSync(newFileLocation,"utf-8");
        expect(fileContent).to.eql(newFileContent);
    })

    it("Should throw an error when the file location is not correct", (done) => {
        assistant.writeFile({} as any, newFileContent).then(() => {
            done("Should reject the promise");
        }).catch(() => {
            done();
        });
    })

    it("Should throw an error when the file location is missing", (done) => {
        assistant.writeFile(undefined, newFileContent).then(() => {
            done("Should reject the promise");
        }).catch(() => {
            done();
        });
    })
})
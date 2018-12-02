import * as path from "path";
import { writeFileSync, unlinkSync, readdirSync, readFileSync } from "fs";
import assistant from "../../src/index";
import { expect } from "chai";
describe("renameFile()", () => {
    const currentDir = path.resolve(__dirname);
    const oldFileName = "sampleFile.txt";
    const sampleFilePath = path.join(__dirname, oldFileName);
    const newFileName = "newFileName.txt";
    const newFilePath = path.join(__dirname, newFileName);
    const fileContents = "sample file";

    beforeEach(() => {
        writeFileSync(sampleFilePath, "sample file");
    })

    afterEach(() => {
        try {
            unlinkSync(newFilePath);
        } catch (e) {}

        try {
            unlinkSync(sampleFilePath);
        } catch (e) {}      
    })

    it("Should resolve the promise when all parameters are correct", async () => {
        await assistant.renameFile(sampleFilePath, newFileName);
    })

    it("Should remove the file with the previus name when all parameters are correct", async () => {
        await assistant.renameFile(sampleFilePath, newFileName);

        const hasFileWithOldName = readdirSync(currentDir).some((file) => file === oldFileName);

        expect(hasFileWithOldName).to.be.false;
    })

    it("Should add a new file with the new name when all parameters are correct", async () => {
        await assistant.renameFile(sampleFilePath, newFileName);

        const hasFileWithNewName = readdirSync(currentDir).some((file) => file === newFileName);

        expect(hasFileWithNewName).to.be.true;
    })

    it("Should add a new file with the same contents as the old file when all parameters are correct", async () => {
        await assistant.renameFile(sampleFilePath, newFileName);

        const contentsOfNewFile = readFileSync(newFilePath, "utf-8");

        expect(contentsOfNewFile).to.equal(fileContents);
    })

    it("Should throw an error when the path to the file is undefined", (done) => {
        assistant.renameFile(undefined, newFileName).then(() => {
            done("The method should reject its promise");
        }).catch(() => {
            done();
        })
    })

    it("Should throw an error when the name of the new file is undefined", (done) => {
        assistant.renameFile(sampleFilePath, undefined).then(() => {
            done("The method should reject its promise");
        }).catch(() => {
            done();
        })
    })
})
import * as fs from "fs";
import assistant from "../../src/index";
import { expect } from "chai";

describe("replaceStringInFile()", () => {
    const initialString = "Replace this -> * with a =";
    const resultString = "Replace this -> = with a =";
    const resultStringNoReplacement = "Replace this ->  with a ="

    const pathToFile = "./testFile.txt";

    beforeEach((done) => {
        console.log("before")
        fs.writeFile(pathToFile, initialString, (err) => {
            done(err);
        });
        console.log("File ready")
    })

    after(()=>{
        
        fs.unlinkSync(pathToFile);
    })

    it("Should resolve the promise when the pattern is a string", async () => {
        console.log("In Test")
        await assistant.replaceStringInFile(pathToFile, "*", "=");
    });

    it("Should resolve the promise when the pattern is a regex", async () => {
        await assistant.replaceStringInFile(pathToFile, /\*/, "=");
    });

    it("Should replace the string correctly when the pattern is a string", async () => {
        await assistant.replaceStringInFile(pathToFile, "*", "=");

        const fileContents = fs.readFileSync(pathToFile, 'utf-8');

        expect(fileContents).to.equal(resultString);
    });

    it("Should replace the string correctly when the pattern is a regex", async () => {
        await assistant.replaceStringInFile(pathToFile, /\*/, "=");

        const fileContents = fs.readFileSync(pathToFile, 'utf-8');

        expect(fileContents).to.equal(resultString);
    });

    it("Should replace the string with nothing when the pattern is a regex and the replacement string is undefined", async () => {
        await assistant.replaceStringInFile(pathToFile, /\*/, undefined);

        const fileContents = fs.readFileSync(pathToFile, 'utf-8');

        expect(fileContents).to.equal(resultStringNoReplacement);
    });

    it("Should replace the string with nothing when the pattern is a string and the replacement string is undefined", async () => {
        await assistant.replaceStringInFile(pathToFile, "*", undefined);

        const fileContents = fs.readFileSync(pathToFile, 'utf-8');

        expect(fileContents).to.equal(resultStringNoReplacement);
    });

    it("Should reject the promise when a path is not provided", (done) => {
        assistant.replaceStringInFile(undefined, "*", "=")
            .then(() => done("Should throw an error"))
            .catch(() => done());
    });

    it("Should reject the promise when a pattern is not provided", (done) => {
        assistant.replaceStringInFile(pathToFile, undefined, "=")
            .then(() => done("Should throw an error"))
            .catch(() => done());
    });

})

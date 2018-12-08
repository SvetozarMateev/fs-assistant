import { resolve } from "path";
import { writeFileSync } from "fs";
import rimraf = require("rimraf");
import assistant from "../../src/index";
import { expect } from "chai";

describe("readFile()",()=>{
    const pathToFile =resolve("./test.txt");
    const contentOfFile = "This is a test file";
    
    before(()=>{
        writeFileSync(pathToFile,contentOfFile);
    })

    after((done)=>{
        rimraf(pathToFile,done);
    })

    it("Should resolve its promise when the arguments are correct", async()=>{
        await assistant.readFile(pathToFile);    
    })

    it("Should return the contents of the file when the path is correct", async()=>{
        const contents = await assistant.readFile(pathToFile);   
        expect(contents).to.equal(contentOfFile);
    })

    it("Should reject its promsie when the path is not correct", (done)=>{
        assistant.readFile("missingfile.txt")
        .then(()=>done("Should throw an error"))
        .catch(()=>done());
    })
})
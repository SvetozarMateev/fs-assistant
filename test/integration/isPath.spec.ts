import assistant from "../../src/index"
import { expect } from "chai";
describe ("isPath()",()=>{
    const correctPaths=[
        ".",
        "..",
        "./",
        "../",
        "testpath/testfile.txt",
        "/testpath/testfile.txt",
        "testpath/testfile.t.txt",
        "/testpath/testfile.t.txt",
        ".\\",
        "..\\",
        "testpath\\testfile.txt",
        "/testpath\\testfile.txt",
        "testpath\\testfile.t.txt",
        "\\testpath\\testfile.t.txt",
        "testpath//testfile.txt",
        "//testpath//testfile.txt",
        "testpath//testfile.t.txt",
        "//testpath//testfile.t.txt",
        "testpath/../testfile.txt",
        "/testpath/./testfile.txt",
        "testpath/./testfile.t.txt",
        "/testpath/../testfile.t.txt",
        "/this path has spaces/test file.t.txt",
        "/%appdata%/../testfile.t.txt",
        "%appdata%/testfile.t.txt",
        "/%appdata%/../test file.t.txt",
        "just a file.spec.ts",
        "myFile.txt",
        "justAFile.spec.ts",
        "my File.txt",
        "folder",
        ".//desktop",
        "//desktop"
    ];
    const incorrectPaths =[
        ".../very invalid",
        "./..../invalid",
        "./invalid/...",
        "///",
        1234,
        {},
        [],
    ];
    correctPaths.forEach((validPath)=>{
        it(`Should return true when the string is "${validPath}"`,()=>{
            const result = assistant.isPath(validPath);
    
            expect(result).to.be.true;
        })
    })

    incorrectPaths.forEach((invalidPath)=>{
        it(`Should return false when the string is "${invalidPath}"`,()=>{
            const result = assistant.isPath(invalidPath as any);
    
            expect(result).to.be.false;
        })
    })
   
})
const fs  = require("fs");
fs.copyFile("./src/typings/api.ts","./dist/index.d.ts",(err)=>{
    if(err){
        console.log(err);
    }

    console.log("Typings copied successfully");
})
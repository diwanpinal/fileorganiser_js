let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
console.log(inputArr);

//node main.js tree "directoryPath"
//node ./nodeproject/main.js organize "directoryPath"
// node ./nodeproject/main.js help
let command = inputArr[0];
let types = {
    media: ["mp4", "mp3", "mkv", "png", "jpg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['xlsx', 'docx', 'doc', 'pdf', 'xlsv', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'pptx'],
    app: ['exe', 'dng', 'pkg', "deb"]

}
switch (command) {
    case "tree":
        treefn(inputArr[1]);
        break;
    case "organize":
        organizefn(inputArr[1]);
        break;
    case "help":
        helpfn();
        break;
    case "default":
        console.log("please use proper command");
        break;

}

function treefn(dirPath) {
    if (dirPath == undefined) {
        console.log("kindly enter the path");
    } else {
        let doesexist = fs.existsSync(dirPath);
        if (doesexist) {
            treeHelper(dirPath, "");

        } else {
            console.log("kindly the correct directory path:");
        }
    }
}

function treeHelper(dirPath, indent) {
    //checking of file/folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "|___" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + " |_______" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }



    }


}














function organizefn(dirPath) {
    //console.log("organize command implemented for dirpath:", dirpath);
    //1.input-> directoryPath given
    let destPath;
    if (dirPath == undefined) {
        console.log("kindly the correct directory path:");
    } else {
        let doesexist = fs.existsSync(dirPath);
        if (doesexist) {
            //2.create -> organized files directory

            destPath = path.join(dirPath, "organised_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);

            }


        } else {
            console.log("kindly the correct directory path:");
        }
    }
    organizedHelper(dirPath, destPath);
}

function organizedHelper(src, dest) {
    //3. identify category of all the files present in the input directory
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to -->", category);
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    console.log(fs.existsSync())

    if (fs.existsSync(categoryPath) == false) {

        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destfilePath = path.join(categoryPath, fileName);

    fs.copyFileSync(srcFilePath, destfilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to", category);
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    //console.log(ext);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }



        }

    }

}











function helpfn() {
    console.log(`
               list of commands:
               node main.js tree directoryPath
              node ./nodeproject/main.js organize directoryPath
              node ./nodeproject/main.js help`);


}
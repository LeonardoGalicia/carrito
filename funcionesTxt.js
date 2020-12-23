const rf = require('fs');

var methods={
    readFile:function(fileName,encoding){
        return rf.readFileSync(fileName, encoding);
    },
    writeFile:function(fileName,encoding){
        return rf.writeFileSync(fileName, encoding);
    }
}

exports.data = methods;



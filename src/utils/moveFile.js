// moves the $file to $dir2
module.exports.moveFile = (file, dir2) => {
  // include the fs, path modules
  const fs = require("fs");
  const path = require("path");

  // gets file name and adds it to dir2
  const f = path.basename(file);
  const dest = path.resolve(dir2, f);

  fs.rename(file, dest, (error) => {
    console.log(error);
  });
};

//move file1.htm from 'test/' to 'test/dir_1/'
// moveFile("./test/file1.htm", "./test/dir_1/");

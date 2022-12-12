var glob = require("glob");
var fs = require("fs");
var path = require("path");

function fromDir(startPath, filter, query, callback) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    try {
      var stat = fs.lstatSync(filename);
      if (
        stat.isDirectory() &&
        !filename.includes("node_modules") &&
        !filename.includes("$RECYCLE.BIN") &&
        !filename.includes(".")
      ) {
        fromDir(filename, filter, query, callback); //recurse
      } else {
        const testName = filter.test(filename);
        const testContent = checkIfContainsSync(filename, query);
        //console.log(filename, " => ", testContent);
        if (testName || testContent) callback(filename);
      }
    } catch (error) {
      //console.info("Ignoring folder ", filename);
    }
  }
}

function checkIfContainsSync(filename, str) {
  const pattern = RegExp("^.*" + str + ".*$");
  const data = fs.readFileSync(filename);
  return pattern.test(data);
}

const searchfile = async ({ key, paths }) => {
  console.log("Requesting explorer .. ");
  var files = [];
  var pattern = RegExp("^.*" + key + ".*$");
  //var pattern = RegExp("^.*" + key + ".*$");
  if (paths && paths.length > 0) {
    Object.values(JSON.parse(paths)).map((path) => {
      fromDir(`${path}:/`, pattern, key, function (filename) {
        console.log("-- found: ", filename);
        files.push(filename);
      });
    });
  }
  console.log("done", files);
  return files;
};
module.exports = {
  searchfile,
};

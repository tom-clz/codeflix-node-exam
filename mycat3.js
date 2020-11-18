const readline = require("readline");
const fs = require("fs");
let args = process.argv.splice(2, process.argv.length - 1);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  console.log(input);

  rl.close();

});

if (process.argv.length == 3) {
  const displayFile = (filename) => {
    const read = fs.createReadStream(filename);
    read.on("data", function (chunk) {
      console.log(chunk.toString());
    });
  };
  displayFile(process.argv[2]);
} 

else if (args.length == 2) {
  if (args[0] == "-e") {
    let rl = readline.createInterface({
      input: fs.createReadStream(args[1], "utf8"),
    });

    rl.on("line", function (line) {
      console.log(line + "$");
    });
    
  } 
  else {
    console.log("Commande fausse");
  }
}
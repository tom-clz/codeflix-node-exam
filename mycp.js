let args = process.argv.splice(2, process.argv.length - 1);
let ms = require('fs');

if (args.length == 2) {
  if (ms.existsSync(args[0])) {
    if (ms.existsSync(args[1])) {
      ms.copyFile(args[0], args[1], (err) => {
        if (err) throw err;

        console.log(`${args[0]} a bien été enregistré dans ${args[1]} `);
      });
    } else {
      ms.rename(args[0], args[1], (err) => {
        if (err) throw err;

        console.log(`${args[0]} a bien été enregistré dans ${args[1]} `);
      });
    }
  } else {
    console.log(`This file : ${args[0]} doesn't exist`);
  }
} else if (args.length == 3) {
  if (args[0] == "-r") {
    if (fs.existsSync(args[1])) {
      var mkdir = function (dir) {
        try {
          fs.mkdirSync(dir, 0755);
        } catch (e) {
          if (e.code != "EEXIST") {
            throw e;
          }
        }
      };

      mkdir(args[2]);
      let files = fs.readdirSync(args[1]);

      for (var i = 0; i < files.length; i++) {
        var current = fs.lstatSync(path.join(src, files[i]));
        if (current.isDirectory()) {
          copyDir(path.join(src, files[i]), path.join(dest, files[i]));
        } else if (current.isSymbolicLink()) {
          var symlink = fs.readlinkSync(path.join(src, files[i]));
          fs.symlinkSync(symlink, path.join(dest, files[i]));
        } else {
          copy(path.join(src, files[i]), path.join(dest, files[i]));
        }
      }
    } else {
      console.log(`This file : ${args[1]}doesn't exist`);
    }
  } else {
    console.log("Commande introuvable");
  }
}

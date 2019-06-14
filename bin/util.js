const { lstatSync, readdirSync, readdir, stat } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = (source) => readdirSync(source)
  .map(name => join(source, name)).filter(isDirectory);

const getDirectoriesDeep = (source, exclude = new Set()) => {
  const dirs = getDirectories(source).filter(v => !exclude.has(v));
  const result = [source];
  dirs.forEach((dir) => {
    result.push(...getDirectoriesDeep(dir));
  });
  return result;
};

module.exports = {
  walk: (dir, done) => {
    let results = [];
    readdir(dir, (err, list) => {
      if (err) return done(err);
      let i = 0;
      (function next() {
        let file = list[i++];
        if (!file) return done(null, results);
        file = `${dir}/${file}`;
        stat(file, (err, stat) => {
          if (stat && stat.isDirectory()) {
            walk(file, (err, res) => {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  },

  getDirectories,
  getDirectoriesDeep,
}

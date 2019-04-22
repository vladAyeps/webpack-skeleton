#!/usr/bin/env node

const fs = require('fs');
const commander = require('commander');
const shell = require('shelljs');

const fileContent = '';
const htmlPartialDir = './src/html-parts/partials';
const scssPartialDir = './src/scss/page/partials';

const generateScss = (path, dir) => {
  if(!fs.existsSync(path)) {
    const scssNamespace = `${scssPartialDir}/${dir}`;
    if(dir) {
      shell.mkdir('-p', scssNamespace);
    }
    fs.writeFile(path, fileContent, (err) => {
      if (err) throw err;
      console.log(`${path} generated`);
    });
  }
};

const walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
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
};

commander
  .command('partial <name>')
  .option('-d, --directory [d]', 'Directory')
  .action((name, cmd) => {

    const htmlNamespace = `${htmlPartialDir}/${cmd.directory}`;
    const htmlPath = `${htmlPartialDir}/${cmd.directory ? cmd.directory + '/' + '_' + name + '.html' : '_' + name + '.html'}`;
    const scssPath = `${scssPartialDir}/${cmd.directory ? cmd.directory + '/' + '_' + name + '.scss' : '_' + name + '.scss'}`;

    if(fs.existsSync(htmlPath) && fs.existsSync(scssPath)) {
      console.log('Partial already exist');
    }

    if(!fs.existsSync(htmlPath)) {
      if(cmd.directory) {
        shell.mkdir('-p', htmlNamespace);
      }
      fs.writeFile(htmlPath, fileContent, (err) => {
        if (err) throw err;
        console.log(`${htmlPath} generated`);
      });
    }

    generateScss(scssPath, cmd.directory);
  });

commander
  .command('scss-partials')
  .action(() => {
    walk(htmlPartialDir, (err, results) => {
      results.forEach(path => {
        const len = path.length;
        const index = path.match('_').index;
        const filename = path.slice(index, len).replace('.html', '.scss');
        const dir = path.slice(0, index).replace(htmlPartialDir, scssPartialDir);
        generateScss(dir + filename, dir.replace(scssPartialDir, ''));
      });
    })

  });

commander.parse(process.argv);

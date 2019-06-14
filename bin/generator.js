#!/usr/bin/env node

const shell = require('shelljs');
const fs = require('fs');
const commander = require('commander');
const { walk } = require('./util');

const fileContent = '';
const htmlPartialDir = './src/template/partial';
const scssPartialDir = './src/scss/page/partial';

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

commander
  .command('partial <name>')
  .option('-d, --directory [d]', 'Directory')
  .option('-e, --ext [e]')
  .action((name, cmd) => {
    const ext = cmd.ext ? cmd.ext.replace(/\./, '') : 'html';
    const htmlNamespace = `${htmlPartialDir}/${cmd.directory}`;
    const htmlPath = `${htmlPartialDir}/${cmd.directory ? cmd.directory + '/' + '_' + name + '.' + ext : '_' + name + '.' + ext}`;
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
  .command('scss-partial')
  .action(() => {
    walk(htmlPartialDir, (err, results) => {
      results.forEach((path) => {
        const len = path.length;
        const { index } = path.match('_');
        const filename = path.slice(index, len).replace(/(\.html|\.pug|.\.hbs)/, '.scss');
        const dir = path.slice(0, index).replace(htmlPartialDir, scssPartialDir);
        generateScss(dir + filename, dir.replace(scssPartialDir, ''));
      });
    });
  });

commander.parse(process.argv);

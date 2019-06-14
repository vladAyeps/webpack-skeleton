#!/usr/bin/env node
const imagemin = require('imagemin');
const path = require('path');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');
const { getDirectoriesDeep } = require('./util');

const baseDir = path.resolve(__dirname, '../src/images');
const exclude = new Set([
  // path.resolve(baseDir, 'svg-sprite'),
  path.resolve(baseDir, 'min'),
]);

const dirs = getDirectoriesDeep(baseDir, exclude);

(async () => {

  for(let i = 0; i < dirs.length; i++) {
    const dir = dirs[i].replace(baseDir, '');
    console.log(`processing images from ${dirs[i]}`);
    await imagemin(
      [`${dirs[i]}/*.{jpg,png}`],
      path.resolve(baseDir, `./min${dir}`), {
        plugins: [
          imageminMozjpeg(),
          imageminPngquant({ quality: '65-80' }),
        ],
      },
    );
    await imagemin(
      [`${dirs[i]}/*.{svg}`],
      path.resolve(baseDir, `./min${dir}`), {
        plugins: [
          imageminSvgo({
            plugins: [
              { removeViewBox: false },
            ],
          }),
        ],
      },
    );
    await imagemin(
      [`${dirs[i]}/*.{jpg,png,webp}`],
      path.resolve(baseDir, `./min${dir}`), {
        plugins: [
          imageminWebp({ quality: '60' }),
        ],
      },
    );
  }

})();

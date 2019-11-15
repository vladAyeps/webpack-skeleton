const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const { getDirectoriesDeep } = require('../bin/util');

const pagePath = path.resolve(__dirname, '../src/page');

const { TEMPLATE_EXT } = process.env;

const html = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: `./src/index.${TEMPLATE_EXT}`,
    title: 'Webpack Skeleton',
  }),
];

/**
 * Scan src/page and find dir/index as individual page
 */
const pages = getDirectoriesDeep(path.resolve(__dirname, '../src/page'));
pages.forEach((dir) => {
  const index = path.resolve(dir, `index.${TEMPLATE_EXT}`)
  if (fs.existsSync(index)) {
    html.push(
      new HtmlWebpackPlugin({
        filename: index.replace(pagePath, '').replace(TEMPLATE_EXT, 'html'),
        template: index,
        title: 'Webpack Skeleton',
      }),
    );
  }
});

module.exports = html;

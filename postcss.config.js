const purgecss = require('@fullhuman/postcss-purgecss');
const whitelister = require('purgecss-whitelister');
const path = require('path');
// Lightgallery styles prepare for whitelist
const lg = whitelister('./node_modules/lightgallery.js/dist/css/lightgallery.min.css');

module.exports = ({ options }) => {
  const pluginsCollection = [
    require('autoprefixer', {
      grid: 'autoplace',
    }),
    require('cssnano'),
  ];
  if (options.env === 'production') {
    pluginsCollection.push(purgecss({
      content: [
        path.join(__dirname, 'src/**/*.html'),
        path.join(__dirname, 'src/**/*.html'),
        path.join(__dirname, 'src/**/*.js'),
        path.join(__dirname, 'src/**/*.ts'),
      ],
      whitelist: lg,
      whitelistPatterns: [
        /modal/,
        /is-/,
        /has-/,
        /swiper/,
        /pagination/,
        /current-menu-item/,
      ],
    }));
  }

  return {
    plugins: pluginsCollection,
  };
};

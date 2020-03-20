const purgecss = require('@fullhuman/postcss-purgecss');
const whitelister = require('purgecss-whitelister');
const path = require('path');

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
        path.join(__dirname, 'src/**/*.pug'),
        path.join(__dirname, 'src/**/*.html'),
        path.join(__dirname, 'src/**/*.js'),
        path.join(__dirname, 'src/**/*.ts'),
      ],
      whitelistPatterns: [
        /is-/,
        /has-/,
        /swiper/,
      ],
    }));
  }

  return {
    plugins: pluginsCollection,
  };
};

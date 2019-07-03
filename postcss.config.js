const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob-all');
const path = require('path');

module.exports = ({options}) => {
  const pluginsCollection = [
    require('autoprefixer', {
      grid: 'autoplace'
    }),
    require('cssnano')
  ];
  if(options.env === 'production') {
    pluginsCollection.push(purgecss({
      content: [
        path.join(__dirname, 'src/**/*.html'),
        path.join(__dirname, 'src/**/*.hbs'),
        path.join(__dirname, 'src/**/*.handlebars'),
        path.join(__dirname, 'src/**/*.pug'),
      ],
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
    plugins: pluginsCollection
  };
};

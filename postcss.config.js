const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob-all');
const path = require('path');

module.exports = ({env}) => {
  const pluginsCollection = [
    require('autoprefixer', {
      grid: 'autoplace'
    }),
    require('cssnano')
  ];
  if(env === 'production') {
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

const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob-all');
const path = require('path');

module.exports = ({env}) => {
  const pluginsCollection = [
    require('autoprefixer'),
    require('cssnano')
  ];
  if(env === 'production') {
    pluginsCollection.push(purgecss({
      content: glob.sync(path.join(__dirname, 'src/**/*.html')),
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

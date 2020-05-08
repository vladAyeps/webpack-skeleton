const purgecss = require('@fullhuman/postcss-purgecss');
const whitelister = require('purgecss-whitelister');
const path = require('path');

class CustomExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/@]+/g) || [];
  }
}

module.exports = ({ options }) => {
  const pluginsCollection = [
    require('autoprefixer', {
      grid: 'autoplace',
    }),
    require('cssnano'),
  ];
  if (options.env === 'production' || options.isProd) {
    pluginsCollection.push(purgecss({
      content: [
        path.join(__dirname, 'src/**/*.pug'),
        path.join(__dirname, 'src/**/*.html'),
        path.join(__dirname, 'src/**/*.js'),
        path.join(__dirname, 'src/**/*.ts'),
      ],
      extractors: [{
        extractor: CustomExtractor,
        extensions: ['html', 'php', 'pug', 'twig'],
      }],
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

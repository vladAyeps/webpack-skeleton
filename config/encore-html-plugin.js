const htmlPlugins = require('./html-plugin');

module.exports = Encore => {
  htmlPlugins.forEach(plugin => {
    Encore.addPlugin(plugin);
  });
};

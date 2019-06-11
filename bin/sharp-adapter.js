const sharp = require('sharp');

module.exports = (imagePath) => {
  const image = sharp(imagePath);

  return {
    metadata: function metadata() {
      return image.metadata();
    },
    resize: function resize({ width, mime, options }) {
      return new Promise((resolve, reject) => {
        if (parseInt(options.onlyHeight, 0) === 1) {
          width = null;
        }
        let resized = image.clone().resize(width, options.height ? parseInt(options.height, 0) : null);

        if (options.withoutEnlargement) {
          resized.options.withoutEnlargement = true;
        }

        if (options.background) {
          resized = resized.background(options.background).flatten();
        }

        if (mime === 'image/jpeg') {
          resized = resized.jpeg({
            quality: options.quality,
          });
        }

        resized.toBuffer((err, data, { height }) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              data,
              height,
              width,
            });
          }
        });
      });
    },
  };
};

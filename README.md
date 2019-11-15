# webpack 4 boilerplate

## Table of Contents
- [Introduction](#introduction)
- [Install](#install)
- [Environment variables](#environment-variables)
- [Builtin Pug template engine](#builtin-pug-template-engine)
- [Builtin Commands](#builtin-commands)
- [Scss](#scss)

## Introduction

Webpack 4 Boilerplate with Babel, SCSS, browser autoprefix, Eslint, Typescript.

### Builtin Production optimizations.

Gzip `.css` and `.js` files
 
ImageminPlugin. [More](https://github.com/Klathmon/imagemin-webpack-plugin)
 
Postcss-purgecss. [More](https://github.com/FullHuman/postcss-purgecss)

## Install 

1. `git clone https://github.com/vladAyeps/webpack-skeleton.git`.
2. Navigate to project folder.
3. Install all Dependencies, `yarn` or `npm install`.
4. Start dev-server `yarn start` or `npm run start`.
5. Run production build `yarn build` or `npm run build`, it will generate folder `dist`.

## Environment variables

`.env` - Environment file

`TEMPLATE_EXT` - main template engine extension, by default `.html`.

`PUBLIC_PATH` - css public path.

`IMAGE_PATH` - main image path.

## Builtin Pug template engine

To use [pug](https://pugjs.org/api/getting-started.html) change default `TEMPLATE_EXT` env variable.

```
TEMPLATE_EXT=pug
``` 

## Structure

`src` - all source files

`src/js` - js source

`src/images` - image source

`src/images/svg-sprite` - [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) image directory.

`src/fonts` - fonts

`src/scss` - scss source

`src/ts` - TypeScript source

`src/page` - additional pages, each directory includes index file and represents page url

`src/partials` - template partials. By default uses underscore partial naming convention ( `_header.html`)

`src/index.(html|pug)` - homepage template

`src/index.js` - main entry point

## Builtin Commands

### Generate partial

Generate partial-template in `src/template/partial` and associated .scss in `src/scss/page/partial` using
underscore partial naming convention.

```
npm run generate partial [name]
```
or
```
yarn generate partial [name]
```

Optional params:
```
-d [name]  - generate partial subdirectory
-e [extension] - partial template extension ( by default html from environment TEMPLATE_EXT)
```

Example: Generate `.pug` partial in subdirectory `test`
```
yarn generate partial test -d test -e pug
```

Result: 
- src/scss/page/partial/test/_test.scss
- src/template/partial/test/_test.pug

### Generate partial associated .scss

The command recursively goes through the directory `./src/template/partail`
 and generates associated .scss files in `src/scss/page/partial/`.

```
npm run generate scss-partial
```
or
```
yarn generate scss-partial
```

### Generate page

```
npm run generate page [name]
```
or
```
yarn generate page [name]
```

Optional params:
```
-e [extension] - partial emplate extension ( by default html from environment TEMPLATE_EXT)
```

Example: generate page `/test`
```
yarn generate partial test
```

Result: `./src/page/test/index.html`

http://localhost:8000/test

### Image minification

The command recursively goes through the directory `src/images` and creates minified images in `src/images/min` 
using [imagemin](https://github.com/imagemin/imagemin).

```
npm run imagemin
```
or
```
yarn imagemin
```

## Scss

`abstract/_vars.scss` - variables

`abstract/_mixin.scss` - builtin mixins

`abstract/_functions.scss` - builtin fnuctions

`utils/` - builtin utility-classes

# Инструкция

## Структура

`src` - все исходники

`src/js` - исходники js

`src/images` - исходники изображений

`src/images/svg-sprite` - svg-изображения только для svg-спрайтов

`src/fonts` - используемые шрифты

`src/scss` - исходники scss

`src/ts` - исходники TypeScript

`src/partials` - html-шаблоны подключаемые внутри осноных html-шаблонов страниц
через интерполяцию

`src/index.html` - основной html-шаблон

`src/index.js` - основная точка входа

## Команды

Установить все пакеты 

npm
```
npm install
```

yarn
```
yarn install
```

Запуск локального веб-сервера:

npm
```
npm run start
```

yarn
```
yarn start
```

Запуск сборки

npm
```
npm run build
```

yarn
```
yarn build
```

## Сборка

Сборка осуществляется командой `build`, во время production-сборки работают дополнительные 
плагины и скрипты оптимизации:

* postcss плагин postcss-purgecss - сканирует html файлы и финальный css,
удаляет все неиспользуемые в проекте селекторы. Поддерживает whitelist селекторов через 
опциональные параметры `whitelistPatterns` - массив регулярных выражений, `whitelist` - 
массив селекторов. [Подробнее](https://github.com/FullHuman/postcss-purgecss);
* ImageminPlugin - сжатие изображений, [Подробнее](https://github.com/Klathmon/imagemin-webpack-plugin);
* svg-sprite-loader - использование svg-изображений в качестве спрайтов;
* FaviconsWebpackPlugin - плагин генерации фавиконок для всевозможных устройств. 
По-умолчанию отключен, для использования необходимо раскомметриовать блок внутри
`webpack.config.prod.js` и добавить корректный путь до исходного изображения - идеальный 
вариант svg-изображение, либо png не менее 512х512. После пересобрать проект.

## Scss

Scss - основной препроцессор проекта для css.

`abstract/_vars.scss` - переменные проекта

`abstract/_mixin.scss` - Коллекция миксинов

`abstract/_functions.scss` - Коллекция функций 

## TypeScript

`utils` - полезные функции-хелперы.

`controller` - логика работы некоторых компонентов, пример - контроллер форм.

`component` - логика работы компонент, пример - слайдеры.

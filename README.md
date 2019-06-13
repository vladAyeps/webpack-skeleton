# Скелет html-верстки на базе webpack 4

Доступны преднастроеные шаблонизаторы handlebars, pug. Для использования шаблонизатора
в настройках html-webpack-plugin в файле `webpack.common.js` в поле `template` необходимо указать 
желаемое расширение.

Пример: использование pug
```
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './src/index.pug', // указать шаблон при необходимости
  title: 'Webpack Skeleton'
}),
``` 

# Структура

`src` - все исходники

`src/js` - исходники js

`src/images` - исходники изображений

`src/images/svg-sprite` - svg-изображения только для svg-спрайтов

`src/fonts` - используемые шрифты

`src/scss` - исходники scss

`src/ts` - исходники TypeScript

`src/partials` - partial-шаблоны

`src/index.html` - основной html-шаблон

`src/index.js` - основная точка входа

# Правила именования

Нижнее подчеркивание `_` в именах .scss, а также template-файлов - указывает, что файл
не является сам по себе независимой единицей и используется, как подключаемый.

# Команды

## Установить все пакеты 

npm
```
npm install
```

yarn
```
yarn install
```

## Запуск локального веб-сервера:

npm
```
npm run start
```

yarn
```
yarn start
```

## Запуск сборки

npm
```
npm run build
```

yarn
```
yarn build
```

## Сгенерировать partial

Команда создаст partial-шаблон и .scss-файл относящийся к ней.

npm
```
npm run generate partial [название]
```

yarn
```
yarn generate partial [название]
```

Доступные опциональные параметры команды:
```
-d [название]  - создание поддиректории для partial
-e [расширение] - желаемое расширение partial ( по-умолчанию 'html' )
```

Пример: Создать partial в директории test с расширением pug  
```
yarn generate partial test -d test -e pug
```
В результате будут созданы файлы `./src/scss/page/partial/test/_test.scss` и 
`./src/template/partial/test/_test.pug`.

## Генерация .scss по существующим partial

Команда рекурсивно проходит по директории `./src/template/partail` и генерирует соответствующие .scss файлы.

npm
```
npm run generate scss-partial
```

yarn
```
yarn generate scss-partial
```

# Сборка

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

# Скелет html-верстки на базе webpack 4

Переменные окружения `.env`.

Доступны преднастроеный шаблонизатор pug. Для использования шаблонизатора
в настройках в файле `.env` в поле `TEMPLATE_EXT` необходимо указать 
желаемое расширение.

Пример: использование pug
```
TEMPLATE_EXT=pug
``` 

# Структура

`src` - все исходники

`src/js` - исходники js

`src/images` - исходники изображений

`src/images/svg-sprite` - svg-изображения только для svg-спрайтов

`src/fonts` - используемые шрифты

`src/scss` - исходники scss

`src/ts` - исходники TypeScript

`src/page` - отдельные страницы, где каждая отдельная страница является директорией
с файлом `index.html` (в случае с шаблоном pug - `index.pug`)

`src/partials` - partial-шаблоны

`src/index.html` - основной html-шаблон

`src/index.js` - основная точка входа

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
-e [расширение] - желаемое расширение partial ( по-умолчанию значение из переменной окружения )
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

## Сгенерировать страницу

npm
```
npm run generate page [название]
```

yarn
```
yarn generate page [название]
```

Доступные опциональные параметры команды:
```
-e [расширение] - желаемое расширение (по-умолчанию значение из переменной окружения)
```

Пример: Создать страницу /test
```
yarn generate partial test
```
Результат: `./src/page/test/index.html`

Страница будет доступна по адресу http://localhost:8000/test

## Минификация изображений вручную

Рекурсивно проходит по директории `src/images`, создает минифицированные изображения
в `src/images/min`.

npm
```
npm run imagemin
```

yarn
```
yarn imagemin
```

# Сборка

Сборка осуществляется командой `build`, во время production-сборки работают дополнительные 
плагины:

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

# Scss

Scss - основной препроцессор проекта для css.

`abstract/_vars.scss` - переменные проекта

`abstract/_mixin.scss` - Коллекция миксинов

`abstract/_functions.scss` - Коллекция функций 

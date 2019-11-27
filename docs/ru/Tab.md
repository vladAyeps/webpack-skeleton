# Tabs

Пример простой реализации табов. 

## Способ использования

Импортировать класс Tab

```
import Tab from '../ts/component/Tab';
```

Создать экземпляр класса, передав первым параметром селектор общего родительского блока для табов.

```
const tabs = new Tab('.js-tabs');
```

Инициализировать функционал табов

```
tabs.init();
```

HTML разметка с селекторами по-умолчанию:
```html
<div class="js-tabs">
  <div class="flex">
    <button class="tab-btn">Tab 1</button>
    <button class="tab-btn">Tab 2</button>
    <button class="tab-btn">Tab 3</button>
  </div>
  <div class="tab-pane">
    Tab 1 Content
  </div>
  <div class="tab-pane">
    Tab 2 Content
  </div>
  <div class="tab-pane">
    Tab 3 Content
  </div>
</div>
```

## Доступные опции

При создании экземпляра класса, вторым параметром можно передать объект опций.

```js
const tabs = new Tab('.js-tabs', {
   btn: '.tab-btn',
   pane: '.tab-pane',
   active: '.is-active',
});
```

**btn** - селектор для кнопок-переключателей (по-умолчанию `.tab-btn`)

**pane** - селектор для контента табов (по-умолчанию `.tab-pane`)

**active** - класс активного элемента (по-умолчанию `.is-active`)

Все параметры являются опциональными.

### Пример
Для разметки
```html
<div class="js-tabs">
  <div class="flex">
    <button class="js-btn active-class">Tab 1</button>
    <button class="js-btn">Tab 2</button>
    <button class="js-btn">Tab 3</button>
  </div>
  <div class="js-content active-class">
    Tab 1 Content
  </div>
  <div class="js-content">
    Tab 2 Content
  </div>
  <div class="js-content">
    Tab 3 Content
  </div>
</div>
```

Правильная инициализация выглядит следующим образом:
```js
const tabs = new Tab('.js-tabs', {
   btn: '.js-btn',
   pane: '.js-content',
   active: '.active-class',
});
```

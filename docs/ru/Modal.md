# Modal

Пример реализации системы модальных окон

## Способ использования

Импортировать класс Modal

```
import Modal from '../ts/component/modal';
```

Создать экземпляр класса.

```
const modal = new Modal();
```

Может при создании принимать объект параметров, по-умолчанию параметры представлены следующим образом :
```js
{
   overlaySelector: '.overlay', // селектор для overlay-блока
   overlayVisibilityClass: '.is-visible', // Класс видимости оверлея
   modalVisibilityClass: '.is-visible', // Класс видимости модального окна
   modalClass: '.modal', // Основной класс модального окна
 }
```

Инициировать элементы, при клике по которым необходимо выводить окно. (В примере представлен вариант выбора
по data-атрибутам, где data-target - содержит id необходимого модального окна)
```js
forEachElement('[data-toggle="modal"]', (el) => {
  const { target } = el.dataset;
  if (!target) {
    return;
  }
  el.onclick = (e) => {
    e.preventDefault();
    modal.open(target);
  };
});
```

Полную реализацию можно увидеть в файле-контроллере: `/src/ts/controller/modal.ts`

## HTML разметка по-умолчанию

```html
<div class="modal modal--default" id="modal">
  <button data-toggle="modal-close" class="modal__close">Закрыть</button>
  <div class="modal__inner">
    <p class="modal__title mt-0">Заголовок</p>
    <p class="modal__subtitle">Подзаголовок</p>
    <div>Любое содержимое</div>
  </div>
</div>
```

import { forEachElement } from '../utils/elements';
import serialize from 'form-serialize';

forEachElement('form', (el: HTMLFormElement) => {
  el.onsubmit = (e) => {
    e.preventDefault();
    console.log(serialize(el));
  };
});

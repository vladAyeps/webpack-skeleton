import Modal from '../component/modal';
import { forEachElement } from '../utils/elements';

const modal = new Modal();

forEachElement('[data-toggle="modal"]', (el: HTMLElement) => {
  const { target } = el.dataset;
  if (!target) {
    return;
  }
  el.onclick = (e: Event) => {
    e.preventDefault();
    modal.open(target);
  };
});

forEachElement('[data-toggle="modal-close"]', (el: HTMLElement) => {
  el.onclick = (e: Event) => {
    e.preventDefault();
    modal.closeModal();
  };
});

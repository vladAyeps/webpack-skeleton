import { forEachElement } from '../../utils/elements';

const MODAL_CLOSE_EVENT = 'ayp.modal.closed';

export default class Modal {
  private overlay: HTMLElement;

  private readonly closeEvent;

  private body: HTMLElement;

  private readonly options: any;

  constructor(opts = {}) {
    this.options = Object.assign({
      overlaySelector: '.overlay',
      overlayVisibilityClass: '.is-visible',
      modalVisibilityClass: '.is-visible',
      modalClass: '.modal',
    }, opts);
    this.closeEvent = new Event(MODAL_CLOSE_EVENT);
    this.init();
  }

  private init = () => {
    this.overlay = document.createElement('div');
    this.overlay.classList.add(this.getOption('overlaySelector'));
    this.body = document.querySelector('body');
    this.body.appendChild(this.overlay);
    this.overlay.onclick = () => {
      this.closeModal();
    };
    forEachElement(`.${this.getOption('modalClass')}`, (el: HTMLElement) => {
      this.recalculate(el);
      el.style.display = 'none';
      el.style.zIndex = '-1';
    });
  };

  public open = (id: string): void => {
    const modalWin = <HTMLElement> document.getElementById(id.replace('#', ''));
    this.hideActive();
    if (!modalWin) {
      return;
    }
    this.showOverlay();
    modalWin.style.removeProperty('display');
    modalWin.style.removeProperty('z-index');
    const h = modalWin.offsetHeight;
    if (h < window.innerHeight) {
      modalWin.style.top = `${this.calculateTop(h, window.innerHeight)}px`;
    } else {
      modalWin.style.top = '0';
    }
    this.body.style.overflow = 'hidden';
    modalWin.classList.add(this.getOption('modalVisibilityClass'));
  };

  private getOption = id => {
    if (!this.options.hasOwnProperty(id)) {
      return null;
    }
    if (typeof this.options[id] === 'string') {
      return (<string> this.options[id]).replace(/^\./, '');
    }
    return this.options[id];
  };

  private showOverlay = (): void => {
    this.overlay.classList.add(this.getOption('overlayVisibilityClass'));
  };

  public closeModal = (): void => {
    this.overlay.classList.remove(this.getOption('overlayVisibilityClass'));
    this.hideActive();
    this.body.style.removeProperty('overflow');
  };

  private calculateTop = (modalH: number, winH: number): number => (winH - modalH) / 2;

  public recalculate = (modal): void => {
    const h = modal.offsetHeight;
    if (h < window.innerHeight) {
      modal.style.top = `${this.calculateTop(h, window.innerHeight)}px`;
    } else {
      modal.style.top = '0';
    }
  };

  private getActive = (): HTMLElement => (document.querySelector(`.${this.getOption('modalClass')}.${this.getOption('modalVisibilityClass')}`));

  private hideActive = (): void => {
    const activeModal = this.getActive();
    if (activeModal !== null) {
      activeModal.classList.remove(this.getOption('modalVisibilityClass'));
      activeModal.addEventListener('transitionend', this.hideModal, false);
    }
  };

  private hideModal = (e: Event) => {
    const { target } = e;
    if (!(<HTMLElement> target).classList.contains(this.getOption('modalClass'))) {
      return;
    }
    (<HTMLElement> target).style.display = 'none';
    (<HTMLElement> target).style.zIndex = '-1';
    (<HTMLElement> target).dispatchEvent(this.closeEvent);
    target.removeEventListener('transitionend', this.hideModal, false);
  };
}

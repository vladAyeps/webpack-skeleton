import { forEachElement } from '../../utils/elements';

const MODAL_CLOSE_EVENT = 'ayp.modal.closed';

export default class Modal {
  private overlay: HTMLElement;

  private readonly closeEvent;

  private body: HTMLElement;

  private readonly options: any;

  constructor(opts = {}) {
    this.options = Object.assign({
      overlayClass: 'overlay',
      overlayVisibilityClass: 'is-visible',
      modalVisibilityClass: 'is-visible',
      modalClass: 'modal',
      modalInClass: 'in',
      modalOutClass: 'out',
    }, opts);
    this.closeEvent = new Event(MODAL_CLOSE_EVENT);
    this.init();
  }

  private init = () => {
    this.overlay = document.createElement('div');
    this.overlay.classList.add(this.options.overlayClass);
    this.body = document.querySelector('body');
    this.body.appendChild(this.overlay);
    this.overlay.onclick = () => {
      this.closeModal();
    };
    forEachElement(`.${this.options.modalClass}`, (el: HTMLElement) => {
      this.recalculate(el);
      el.classList.remove(this.options.modalInClass);
      el.classList.remove(this.options.modalOutClass);
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
    modalWin.classList.add(this.options.modalInClass);
    modalWin.style.removeProperty('display');
    modalWin.style.removeProperty('z-index');
    const h = modalWin.offsetHeight;
    
    modalWin.addEventListener('transitionend', this.removeHelperClass, false);
    if (h < window.innerHeight) {
      modalWin.style.top = `${this.calculateTop(h, window.innerHeight)}px`;
    } else {
      modalWin.style.top = '0';
    }
    this.body.style.overflow = 'hidden';
    modalWin.classList.add(this.options.modalVisibilityClass);
  };

  private showOverlay = (): void => {
    this.overlay.classList.add(this.options.overlayVisibilityClass);
  };

  public closeModal = (): void => {
    this.overlay.classList.remove(this.options.overlayVisibilityClass);
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

  private getActive = (): HTMLElement => (document.querySelector(`.${this.options.modalClass}.${this.options.modalVisibilityClass}`));

  private hideActive = (): void => {
    const activeModal = this.getActive();
    if (activeModal !== null) {
      activeModal.classList.remove(this.options.modalInClass);      
      activeModal.classList.add(this.options.modalOutClass);
      activeModal.classList.remove(this.options.modalVisibilityClass);
      activeModal.addEventListener('transitionend', this.hideModal, false);
      activeModal.addEventListener('transitionend', this.removeHelperClass, false);
    }
  };

  private hideModal = (e: Event) => {
    const { target } = e;
    if (!(<HTMLElement> target).classList.contains(this.options.modalClass)) {
      return;
    }
    (<HTMLElement> target).style.display = 'none';
    (<HTMLElement> target).style.zIndex = '-1';
    (<HTMLElement> target).dispatchEvent(this.closeEvent);
    
    target.removeEventListener('transitionend', this.hideModal, false);    
  };

  private removeHelperClass = (e: Event) => {
    const { target } = e;
    if (!(<HTMLElement> target).classList.contains(this.options.modalClass)) {
      return;
    }
    (<HTMLElement> target).classList.remove(this.options.modalOutClass);
    (<HTMLElement> target).classList.remove(this.options.modalInClass);

    target.removeEventListener('transitionend', this.removeHelperClass, false);
  };
}

import { forEachElement } from '../utils/elements';

interface Options {
  btnSelector: string
  paneSelector: string
  activeClass: string
}

interface TabContainer extends HTMLElement {
  btns: NodeList
  pane: HTMLElement[]
}

interface TabBtn extends HTMLElement {
  tabIndex: number
  tabContainer: TabContainer
}

export default class Tab {
  private readonly tabBtnClassName: string;

  private readonly tabClassName: string;

  private readonly activeClass: string;

  private readonly wrapper: NodeList;

  private options: Options;

  constructor(selector: string | NodeList, options?: Options) {
    this.options = Object.assign({
      btnSelector: '.tab-btn',
      paneSelector: '.tab-pane',
      activeClass: '.is-active',
    }, options);
    this.wrapper = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
    this.tabBtnClassName = this.options.btnSelector;
    this.tabClassName = this.options.paneSelector;
    this.activeClass = this.options.activeClass.replace(/\./, '');
  }

  public init = () => {
    forEachElement(this.wrapper, (el: TabContainer) => {
      el.pane = Array.from(el.querySelectorAll(this.tabClassName));
      el.btns = this.initBtns(el.querySelectorAll(this.tabBtnClassName), el);
    });
  };

  private initBtns = (btns: NodeList, container: TabContainer) => {
    forEachElement(btns, (el: TabBtn, index) => {
      el.tabIndex = index;
      el.tabContainer = container;
      el.onclick = e => {
        e.preventDefault();
        if (el.classList.contains(this.activeClass)) {
          return;
        }
        this.setActiveBtn(el);
      };
      if (index === 0) {
        this.setActiveBtn(el);
      }
    });

    return btns;
  };

  private setActiveBtn = (btn: TabBtn) => {
    const active = btn.tabContainer.querySelector(`${this.tabBtnClassName}.${this.activeClass}`);
    if (active) {
      active.classList.remove(this.activeClass);
    }
    btn.classList.add(this.activeClass);
    this.setActivePane(this.getPane(btn.tabIndex, btn.tabContainer), btn.tabContainer);
  };

  private setActivePane = (pane: HTMLElement | undefined, container: HTMLElement) => {
    const active = container.querySelector(`${this.tabClassName}.${this.activeClass}`);
    if (active) {
      active.classList.remove(this.activeClass);
    }
    if (!pane) {
      return;
    }
    pane.classList.add(this.activeClass);
  };

  private getPane = (index, container: TabContainer) => {
    return container.pane[index];
  };
}

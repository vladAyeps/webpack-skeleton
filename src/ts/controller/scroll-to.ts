import { scrollToElement } from '../utils/scroll-to';
import { forEachElement } from '../utils/elements';

forEachElement('[data-action="scroll-to"]', (el: HTMLElement) => {
    el.onclick = (e) => {
        e.preventDefault();
        const { target } = el.dataset;
        const targetEl = <HTMLElement> document.querySelector(target);
        if (!target || !targetEl) {
            return;
        }

        scrollToElement(targetEl, 1500).then(() => {
            console.log('scroll complete')
        });
    }
});
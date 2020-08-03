// @ts-nocheck
/* eslint-disable */
import { easeInOutQuad } from 'js-easing-functions';
  
/**
 * @param {number} amount
 */
const move = (amount: number) => {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
}

const position = () => (window.pageYOffset || document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop);

/**
 * 
 * @param {number} to 
 * @param {number} duration 
 * @param {Function} easingFunction 
 */
export const scrollToPosition = (to: number, duration: number = 500, easingFunction: Function = easeInOutQuad) => {
    const start = position();
    const change = to - start;
    const increment = 20;
    let startTime = Date.now();
    return new Promise((resolve: Function, reject: Function) => {
        const tick = () => {
            const elapsed = Date.now() - startTime;
            move(easingFunction(elapsed, start, change, duration));
        
            if (elapsed < duration) {
                requestAnimationFrame(tick);
            } else {
                resolve();
            }
        }

        tick();
    });
}

/**
 * @param {HTMLElement} el
 * @param {number} duration
 * @param {Function} easingFunction
 */
export const scrollToElement = (el: HTMLElement, duration: number = 500, easingFunction: Function = easeInOutQuad) => {
    const to = position() + el.getBoundingClientRect().top;
    return scrollToPosition(to, duration, easingFunction)
}
/* eslint-enable */

export default {
    scrollToPosition,
    scrollToElement,
};
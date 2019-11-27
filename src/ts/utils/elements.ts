export const forEachElement = (selector: string|NodeList, callback: (el: HTMLElement, index: number) => void): void => {
  const nodes = typeof selector === 'string'
    ? document.querySelectorAll(<string> selector) : <NodeList> selector;
  Array.from(nodes).forEach((el: HTMLElement, index) => {
    callback(el, index);
  });
};

export default {
  forEachElement,
};

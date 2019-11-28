export const setActive = (...args: HTMLElement[]): void => {
  args.forEach((el: HTMLElement) => {
    if (el) {
      el.classList.add('is-active');
    }
  });
};

export const toggleActive = (...args: HTMLElement[]): void => {
  args.forEach((el: HTMLElement) => {
    if (el) {
      el.classList.toggle('is-active');
    }
  });
};

export const removeActive = (...args: HTMLElement[]): void => {
  args.forEach((el: HTMLElement) => {
    if (el) {
      el.classList.remove('is-active');
    }
  });
};

export default {
  setActive,
  removeActive,
  toggleActive,
};

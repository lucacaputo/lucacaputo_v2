export const isInViewport = (element: HTMLElement): boolean => {
    const wh = window.innerHeight || document.documentElement.clientHeight;
    const { top, bottom } = element.getBoundingClientRect();
    return top <= wh && top >= 0 && bottom >= 0;
}
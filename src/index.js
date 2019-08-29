import './css/main.scss';

window.document.addEventListener('DOMContentLoaded', () => init(window));


function init(global) {
  const mainContentElement    = global.document.querySelector('.main-content');
  const scrollIndicatorButton = global.document.querySelector('.scroll-indicator');

  scrollIndicatorButton.addEventListener('click', () => {
    mainContentElement.scrollIntoView();
    // global.scrollTo(0, window.innerHeight);
  });
}

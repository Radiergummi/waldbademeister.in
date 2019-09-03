import './css/main.scss';

window.document.addEventListener('DOMContentLoaded', () => init(window));


function init(global) {
  const mainContentElement    = global.document.querySelector('.main-content');
  const scrollIndicatorButton = global.document.querySelector('.scroll-indicator');

  if ( scrollIndicatorButton ) {
    scrollIndicatorButton.addEventListener('click', () => {
      mainContentElement.scrollIntoView();
      // global.scrollTo(0, window.innerHeight);
    });
  }

  Array
    .from(global.document.querySelectorAll('[data-href]'))
    .map((button) => button.addEventListener('click', () => global.location.href = button.dataset.href));
}

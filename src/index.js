import './css/main.scss';

window.document.addEventListener('DOMContentLoaded', () => init(window));

function init(global) {
  initializeScrollIndicator('.main-content', '.scroll-indicator');
  initializeButtonLinks('href');
  initializeBanners();


  /**
   * If this page has a scroll indicator button (all pages using the hero partial do),
   * we'll want to scroll down one frame if the user clicks it.
   *
   * @param {string}  scrollTargetSelector            Target element to scroll to
   * @param {string}  scrollIndicatorButtonSelector   Button to attach the event to
   */
  function initializeScrollIndicator(scrollTargetSelector, scrollIndicatorButtonSelector) {
    const scrollTarget          = global.document.querySelector(scrollTargetSelector);
    const scrollIndicatorButton = global.document.querySelector(scrollIndicatorButtonSelector);

    if ( scrollIndicatorButton ) {
      scrollIndicatorButton.addEventListener('click', () => scrollTarget.scrollIntoView());
    }
  }

  /**
   * In some cases, we need buttons instead of links that change the browser location
   * and therefore act like a link. For example, this is the case with the backdrop-filter
   * CSS property which currently does _not_ work on anchor elements (09/2019).
   * This method makes these links clickable, as long as they have a data attribute
   * containing the target.
   *
   * @param {string}  dataAttribute  CSS selector to locate link buttons with
   */
  function initializeButtonLinks(dataAttribute = 'href') {
    const linkElements = Array.from(global.document.querySelectorAll(`[data-${ dataAttribute }]`));

    linkElements.map((button) => button.addEventListener('click', () => global.location.href = button.dataset[ dataAttribute ]));
  }

  function initializeBanners(
    portalSelector   = '#banner-portal',
    successSelector  = '#banner-success',
    errorSelector    = '#banner-error',
    successParameter = 'success',
    errorParameter   = 'error',
  ) {
    const urlParams     = new global.URLSearchParams(global.location.search);
    const successBanner = global.document.querySelector(`template${ successSelector }`);
    const errorBanner   = global.document.querySelector(`template${ errorSelector }`);
    const bannerPortal  = global.document.querySelector(portalSelector);

    // If the current page doesn't have a banner portal, abort here
    if ( !bannerPortal ) {
      return;
    }

    // If we have a success parameter inside the URL, insert a success banner
    if ( urlParams.has(successParameter) && successBanner ) {
      // Replace the banner portal with the success banner content
      bannerPortal.replaceWith(successBanner.content);
    }

    // If we have an error parameter inside the URL, insert an error banner
    if ( urlParams.has(errorParameter) && errorBanner ) {
      // Take the error text from the query parameter
      const errorText = urlParams.get(errorParameter);

      // Locate the banner text container inside the content fragment
      const bannerTextElement = errorBanner.content.firstElementChild;

      // Replace the inner text of the banner text container with the error text
      bannerTextElement.innerText = errorText;

      // Replace the banner portal with the patched error banner content
      bannerPortal.replaceWith(errorBanner.content);
    }
  }
}

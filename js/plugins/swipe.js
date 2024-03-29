import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';

// const leftArrowSVGString = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 100 125" width="100" height="125"><path d="M5,50L50,5l3,3L11,50l42,42l-3,3L5,50z M92,95l3-3L53,50L95,8l-3-3L47,50L92,95z"/></svg>';

const leftArrowSVGString = '<svg aria-hidden="true" class="pswp__icn"  width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66797 12C4.39183 12 4.16797 12.2239 4.16797 12.5C4.16797 12.7761 4.39183 13 4.66797 13L4.66797 12ZM21.3346 13C21.6108 13 21.8346 12.7761 21.8346 12.5C21.8346 12.2239 21.6108 12 21.3346 12L21.3346 13ZM4.66797 13L21.3346 13L21.3346 12L4.66797 12L4.66797 13Z" fill="#1D1D1D"></path><path d="M5.02152 12.1477C4.82626 11.9525 4.50968 11.9525 4.31442 12.1477C4.11915 12.343 4.11915 12.6596 4.31442 12.8549L5.02152 12.1477ZM11.6061 20.1465C11.8013 20.3418 12.1179 20.3418 12.3132 20.1465C12.5085 19.9513 12.5085 19.6347 12.3132 19.4394L11.6061 20.1465ZM4.31442 12.8549L11.6061 20.1465L12.3132 19.4394L5.02152 12.1477L4.31442 12.8549Z" fill="#1D1D1D"></path><path d="M5.02152 12.8562C4.82626 13.0514 4.50968 13.0514 4.31442 12.8562C4.11915 12.6609 4.11915 12.3443 4.31442 12.1491L5.02152 12.8562ZM11.6061 4.85738C11.8013 4.66212 12.1179 4.66212 12.3132 4.85738C12.5085 5.05265 12.5085 5.36923 12.3132 5.56449L11.6061 4.85738ZM4.31442 12.1491L11.6061 4.85738L12.3132 5.56449L5.02152 12.8562L4.31442 12.1491Z" fill="#1D1D1D"></path></svg>';

const options = {
    arrowPrevSVG: leftArrowSVGString,
    arrowNextSVG: leftArrowSVGString,
  
    // to apply styles just to this instance of PhotoSwipe
    mainClass: 'pswp--custom-icon-colors',
  
    gallery: '.my-gallery',
    children: 'a',
    pswpModule: () => import('./photoswipe.esm.js')
  };

const lightbox = new PhotoSwipeLightbox(options);
lightbox.init();
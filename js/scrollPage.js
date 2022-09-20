
const cardNav = $('.card-nav');
$('.card-nav').hide(); // убрать меню при загрузке стр

window.addEventListener('scroll', function () {

  // найти расстояние до заголовка 'Завершите свой образ'
  // скрол должен появлятся с порокруткой до этого заголовка
  const scrollPlace = document.querySelector('.scroll-place');
  // console.log('scrollPlace = ', scrollPlace)
  // scrollPlace.scrollIntoView() прокрутка до начала блока scrollPlace

  // ---------------------------
  // console.log('scrollPlace.offset().top ! = ', scrollPlace.offset().top)
  // console.log('scrollPlace.position().top ! = ', scrollPlace.position().top)
  // const offsetFromScreenTop = $(".scroll-place").offset().top + $(window).scrollTop();
  // console.log('offsetFromScreenTop = ', offsetFromScreenTop)
  // ---------------------------

  if ($(window).scrollTop() > 700) {
    cardNav.show();
    // console.log('scrollTop() > 400');
  }
  else {
    cardNav.hide();
    // console.log('scrollTop() <= 400');
  }

  const mainNav = $('.page-header');

  if ($(window).scrollTop() > 0) {
    mainNav.addClass('page-header-fixed');
  } else {
    mainNav.removeClass('page-header-fixed');
  }

});

$(".order-table-delete").on("click", function (e) {
  e.preventDefault();
  const parent = e.target.parentNode.parentNode
  parent.classList.toggle('d-none');
});

const checkList = document.querySelectorAll('.check-list a');

checkList.forEach((item) => {
  item.addEventListener('click', (e) => {
    console.log('click dimensionsList');
    e.preventDefault();
    const item = e.target
    item.classList.toggle('active');
  });

});


// $("button.basket-open").on("click", function (e) {
//   e.preventDefault();
//   const item = e.target
//   item.classList.toggle('active');
// });

$('#catalog-basket').on("click", function (e) {
  e.preventDefault();
  const item = e.target
  item.classList.toggle('active');
});



// const simplebarsList = document.querySelectorAll('.simplebar');
// console.log('simplebarsList = ', simplebarsList);

// simplebarsList.forEach((item) => {
//   new SimpleBar(item, {
//     autoHide: false,
//   });
// })
// 
// simpleBar.unMount()

const simplebar1 = document.querySelector('.basket-mobile-menu__body.test.simplebar');
const body = document.querySelector('body');

if (body.classList.contains('size-open')) {
  console.log('contains(size-open)');
  new SimpleBar(simplebar1, { autoHide: false });
}






$('.jcf-option-notify-about-arrival').on("click", function (e) {
  console.log('notify-about-arrival !!!');
});


$('.sms-not-coming').on("click", function (e) {
  console.log('sms-not-coming');
  e.preventDefault();
  window.location = 'login.html';
  const tabs = document.querySelectorAll('.sign-with');

  tabs.forEach((item) => {
    console.log('111item.classList = ', item.classList);
    // (data-tab="#auth-form_phone") 
  });

});


// сделать при клике окрашивание границы в черный и появление подсписка

const radiosList = document.querySelectorAll('.basket-form .form-item--radio');
console.log('radiosList = ', radiosList);

radiosList.forEach((item) => {
  item.addEventListener('click', (e) => {
    const row = e.target.parentNode.parentNode.parentNode.parentNode;

    // очистить от класса .black-border   все эл-ты списка

    console.log('item3 = ', row.classList.add('black-border'));
    // console.log('item3 = ', row.classList.toggle('black-border'));
  });
})

// переключение картинки при нажатии на цвета
// card.html  блок под наз/ценой товара

const tovarColorItem = document.querySelectorAll('.catalog-item .order-table__color');
const allColorLinks = document.querySelectorAll('a.order-table__color-link');
const productListLinks = document.querySelectorAll('.product-list a.product-list-link');

productListLinks.forEach((item) => {

  item.addEventListener('click', (evt) => {
    evt.preventDefault(); //for click
    const imgSrcNew = evt.target.getAttribute('data-imgsrcnew');
    const tovarMiniaturs = document.querySelectorAll('ul.product-list img');
    const cardNav = document.querySelector('.card-nav ul.product-list');
    const productHolder = document.querySelector('.product-title-holder ul.product-list');

    tovarMiniaturs.forEach((item) => {
      item.classList.remove('active');
    });
    // evt.target.classList.toggle('active');
    if (evt.target.classList.contains('product-list-img-1')) {
      cardNav.querySelector('.product-list-img-1').classList.toggle('active')
      productHolder.querySelector('.product-list-img-1').classList.toggle('active')
    } else {
      cardNav.querySelector('.product-list-img-2').classList.toggle('active')
      productHolder.querySelector('.product-list-img-2').classList.toggle('active')
    }
    // моб версия слайдера
    const changeImgMobile = document.querySelector('.my-gallery .slick-current.slick-active img.product-photos-gallery__img');
    if (imgSrcNew) { changeImgMobile.src = imgSrcNew }
    // десктопная версия слайдера
    const changeImgDesktop = document.querySelector('.my-gallery .slick-current.slick-active img');
    if (imgSrcNew) { changeImgDesktop.src = imgSrcNew }

  });


});

//переключение картинки при нажатии на цвета в карточках
// слайдеры 'Вам также может понравиться' и 'Ранее вы смотрели' др блоки с карточками


// const sizeGuideLink = document.querySelector('.size-guide-link');

// sizeGuideLink.addEventListener('click', (e) => {
//   console.log('sizeGuideLink');

// });

// -----------page-favorites-----------------------
const favoritesList = document.querySelectorAll('.page-favorites .catalog-item.w2 .catalog-item-like');

favoritesList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    const parent = evt.target.parentNode;
    parent.classList.toggle('d-none');

  });
});

// ---закрыть корзину показать попап 'Вы подписаны'------------------------------
const sizeGuideLink = document.querySelector('.size-guide-link');
const pageBody = document.querySelector('body');
sizeGuideLink.addEventListener('click', (evt) => {
  pageBody.classList.remove('show-filter');

});
// ---кнопка 'Подробнее'------------------------------
const linkMore = document.querySelector('.link-more-js');

if (linkMore) {
  linkMore.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.target.nextElementSibling.classList.toggle('d-none');

  });
}


// $(".catalog-items--slider-watched").slick({
//   slidesToShow: 6,
//   slidesToScroll: 1,
//   dots: false,
//   arrows: true,
//   infinite: true,
//   autoplay: false,
//   speed: 500,
//   prevArrow: $prevArr,
//   nextArrow: $nextArr,
//   responsive: [
//     {
//       breakpoint: 1000,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         arrows: false,
//         speed: 200
//       }
//     }
//   ]
// });


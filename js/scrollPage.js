
const cardNav = $('.card-nav');
const menuSections = $('#catalog-search-menu .menu-sections');

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
    menuSections.addClass('menu-sections-top');

  } else {
    mainNav.removeClass('page-header-fixed');
    menuSections.removeClass('menu-sections-top');

  }

});

$(".order-table-delete").on("click", function (e) {
  e.preventDefault();
  const parent = e.target.parentNode.parentNode
  parent.classList.toggle('d-none');
});

$(".clean-basket-js").on("click", function (e) {
  e.preventDefault();
  const parent = e.target.parentNode.parentNode
  parent.querySelector('.basket-mobile-menu__body').classList.add('d-none');
  parent.querySelector('.message').classList.toggle('d-none');
  parent.parentNode.querySelector('.basket-mobile-menu__footer').classList.add('d-none');
  parent.parentNode.querySelector('.counter-js').classList.add('d-none');
  parent.parentNode.querySelector('.basket-mobile-menu__header').classList.add('d-none');
});

const checkListLinks = document.querySelectorAll('.check-list a');
console.log('checkListLinks = ', checkListLinks);

checkListLinks.forEach((item) => {
  item.addEventListener('click', (e) => {
    console.log('click dimensionsList');
    e.preventDefault();
    const item = e.target
    const parentList = item.parentNode.parentNode;
    const parentListLinks = parentList.querySelectorAll('a');

    parentListLinks.forEach((item) => {
      item.classList.remove('active');
    });
    item.classList.toggle('active');

    const sizePopupLinks = document.querySelector('#size-popup');
    const countLinks = sizePopupLinks.querySelectorAll('.active').length;

    if (countLinks === 3) {
      const changeButton = document.querySelector('.basket-open');
      changeButton.innerHTML = 'ДОБАВИТЬ В КОРЗИНУ'
      changeButton.href = 'basket.html'
    }

  });

});

const simplebar1 = document.querySelector('.basket-mobile-menu__body.test.simplebar');
const body = document.querySelector('body');

if (body.classList.contains('size-open')) {
  // console.log('contains(size-open)');
  new SimpleBar(simplebar1, { autoHide: false });
}

// const sizeOpenList = document.querySelectorAll('.size-open');
// console.log('sizeOpenList = ', sizeOpenList);

$('.sms-not-coming').on("click", function (e) {
  // console.log('sms-not-coming');
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
// console.log('radiosList = ', radiosList);

radiosList.forEach((item) => {
  item.addEventListener('click', (e) => {
    const row = e.target.parentNode.parentNode.parentNode.parentNode;
    const eTarget = e.target
    const textCard = document.querySelector('.text-card')
    const textReceipt = document.querySelector('.text-receipt')

    // очистить от класса .black-border   все эл-ты списка
    // console.log('item3 = ', row.classList.add('black-border'));

    if (eTarget.value == 'card') {
      textCard.classList.toggle('d-none');
      textReceipt.classList.add('d-none');
    }
    if (eTarget.value == 'receipt') {
      textCard.classList.add('d-none');
      textReceipt.classList.toggle('d-none');
    }
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

// -----------page-favorites-----------------------
const favoritesList = document.querySelectorAll('.page-favorites .catalog-item.w2 .catalog-item-like');

favoritesList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    const parent = evt.target.parentNode.parentNode;
    parent.classList.toggle('d-none');

  });
});

// ---закрыть корзину показать попап 'Вы подписаны'------------------------------
// const sizeGuideLink = document.querySelector('.size-guide-link');
// const pageBody = document.querySelector('body');
// sizeGuideLink.addEventListener('click', (evt) => {
//   pageBody.classList.remove('show-filter');
// });
// ---кнопка 'Подробнее'------------------------------
const linksMore = document.querySelectorAll('.link-more-js');

linksMore.forEach((item) => {
  if (item) {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      // evt.target.nextElementSibling.classList.toggle('d-none');
      // console.log('evt.target.nextElementSibling = ',evt.target.nextElementSibling);
      evt.target.nextElementSibling.classList.toggle('v-hidden');
    });
  }
});

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
//

// аккардион-обычный  без чекбокса
$('.accordion--basket-page .accordion-item-heading').on("click", function (e) {
  const parent = e.target.parentNode.parentNode.parentNode;
  const check = parent.querySelector('input');

  if (check.checked) {
    check.checked = false;
  } else {
    check.checked = true;
  }

});

// аккардион с чекбоксом
const filterInputs = document.querySelectorAll('input[name="pickup"]');
filterInputs.forEach((item) => {
  item.addEventListener('click', (e) => {
    const parent = e.target.parentNode.parentNode.parentNode.parentNode;
    const content = parent.querySelector('.filter-row__content');
    const input = parent.querySelector('input');

    // закрыть все item если они не выбраны (нет checked)
    filterInputs.forEach((item) => {
      const contentCurrent = item.parentNode.parentNode.parentNode.parentNode; // выбираем .filter-row__inner

      if (item.checked) {
        contentCurrent.classList.add('opend');
      } else {
        contentCurrent.classList.remove('opend');
      }
    });
  });
});

const paymentList = document.querySelectorAll('.payment-list input[type="radio"]');

paymentList.forEach((item) => {

  item.addEventListener('click', (e) => {
    paymentList.forEach((item) => {
      const contentCurrent = item.parentNode.parentNode.parentNode; // выбираем .filter-row__inner
      if (item.checked) {
        contentCurrent.classList.add('opend');
      } else {
        contentCurrent.classList.remove('opend');
      }
    });

  });

});

// закрыть все попапы

const closeAllPopups = document.querySelectorAll('.page-popup');
const btnClose = document.querySelectorAll('.close-popup');

btnClose.forEach((item) => {

  item.addEventListener('click', (e) => {
      // console.log('close all btns');
      closeAllPopups.forEach((popup) => {
      
        if (!popup.classList.contains('mfp-hide')) {
          popup.classList.add('mfp-hide');
          document.querySelector('mfp-bg').classList.remove('mfp-hide');
        } 
      
      });

  });

});


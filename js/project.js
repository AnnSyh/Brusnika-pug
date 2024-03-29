(function ($) {
	var PROJECT = (function () {

		var $sel = {};
		$sel.window = $(window);
		$sel.html = $("html");
		$sel.body = $("body", $sel.html);
		$sel.page = $(".page", $sel.body);

		return {
			init: function () {
				var self = this;

				self.header.init();
				self.catalog.init();
				self.note.init();
				self.searchForm.init();
				self.glossary.init();
				self.forms.init();
				self.pager.init();
				self.filter.init();
				self.basket.init();
				self.popups.init();
				self.accordion.init();
				self.tabs.init();
				self.mobile.init();
				self.tooltips.init();
				self.rotate.init();
				self.map.init();
			},

			header: {
				$btn: null,
				$menu: null,
				$searchMenu: null,
				$buyerMenu: null,
				$basketMenu: null,
				$sizeMenu: null,
				$links: null,
				$blocks: null,
				$pageNote: null,

				opened: false,
				openedSearchMenu: false,
				openedBuyerhMenu: false,
				openedBasketMenu: false,
				openedSizeMenu: false,

				showTimer: false,
				hideTimer: false,

				init: function () {
					var self = this;

					// self.$filterMenu = $(".filter-menu", $sel.page);

					self.$simplebar = $(".simplebar", $sel.page);
					self.$cardNav = $(".card-nav", $sel.page);

					self.$catalogItemSlider = $(".catalog-items--slider", $sel.page);
					self.$catalogItemSliderPrevWatched = $(".slider-prev-watched .catalog-items--slider", $sel.page);

					self.$sizeOpenBtn = $(".size-open", $sel.page);
					self.$sizeOpenLink = document.querySelector('.size-open-link');
					console.log('!!! sizeOpenLink = ', self.$sizeOpenLink);

					// self.$sizeOpenList = document.querySelectorAll('.size-open');
					// console.log('111 sizeOpenList = ', self.$sizeOpenList);

					self.$sizeMenu = $("#catalog-size", $sel.page);

					self.$basketOpenBtn = $(".basket-open", $sel.page);
					self.$basketMenu = $("#catalog-basket", $sel.page);

					self.$popupBasketOpenBtn = $("button.basket-open", $sel.page);
					self.$popupBasketMenu = $("#catalog-basket", $sel.page);

					self.$dropdown = $(".header-menu__item-dropdown", $sel.page);
					self.$buyerMenu = $("#catalog-buyer-menu", $sel.page);
					self.$buyerMenuSections = $(".menu-sections", $sel.page);
					self.$buyerMenuSectionsNotDropdown = $(".header-menu__list .header-menu__item:not(.catalog-dropdown)", $sel.page);

					self.$btn = $(".catalog-open", $sel.page);
					self.$menu = $("#catalog-menu", $sel.page);


					self.$searchBtn = $(".catalog-search-open", $sel.page); // берет 1-ый эл-т с соот классом 
					// self.$searchBtn = $(".catalog-search-open.only-desktop_header-menu", $sel.page);
					// self.$searchBtnMobile = $(".catalog-search-open.only-mobile_header-menu", $sel.page);

					self.$searchMenu = $("#catalog-search-menu", $sel.page);

					self.$links = $(".catalog-menu-section-item.submenu", self.$menu);
					self.$blocks = $(".catalog-menu-conten-item", self.$menu);

					// self.$pageNote = $(".page-note", $sel.page);

					self.$searchBtn.on("click", function (e) { //раскрытие меню при клике
						var $block = $(this);
						console.log('block = ', $block);

						e.preventDefault();
						e.stopPropagation();
						self.openedSearchMenu ? self.closeSearchMenu() : self.openSearchMenu();
						self.openedSearchMenu ? $block.addClass("open-search") : $block.removeClass("open-search");
						// (self.openedSearchMenu & self.$pageNote) ? $block.addClass("open-search") : $block.removeClass("open-search");

						// реинициализация слайдера 
						self.$catalogItemSlider.slick('unslick');
						// self.$catalogItemSlider.remove(); /* Remove current slides elements, in case that you want to show new slides. */
						// -------------------------- /* Initialize the slick again */
						self.$catalogItemSlider.slick({
							slidesToShow: 4,
							slidesToScroll: 2,
							dots: false,
							arrows: true,
							infinite: true,
							autoplay: false,
							speed: 500,
							arrows: false,

							responsive: [
								{
									breakpoint: 480,
									settings: {
										slidesToShow: 3,
									}
								}
							]
						});
						// --------------------------
					});

					self.$btn.on("click", function (e) { //раскрытие меню при клике

						e.preventDefault();
						e.stopPropagation();
						self.opened ? self.closeMenu() : self.openMenu();
					});

					self.$basketOpenBtn.on("click", function (e) { //раскрытие меню при клике
						console.log('$basketOpenBtn cardNav = ', self.$cardNav);
						e.preventDefault();
						e.stopPropagation();
						self.$cardNav.hide();
						self.openedBasketMenu ? self.closeBasketMenu() : self.openBasketMenu();

					});

					self.$popupBasketOpenBtn.on("click", function (e) {
						console.log('popupBasketOpenBtn');
						e.preventDefault();
						e.stopPropagation();
						self.openedBasketMenu ? self.closeBasketMenu() : self.openBasketMenu();
					});

					/////--------------------
					// self.$sizeOpenList.forEach((item) => {
					// 	item.addEventListener('click', (e) => {
					// 		e.preventDefault();
					// 		e.stopPropagation();
					// 		self.openedSizeMenu ? self.closeSizeMenu() : self.openSizeMenu();
					// 	})
					// });

					// self.$sizeOpenLink.addEventListener('click', (e) => { //раскрытие меню при клике
					// 	console.log('sizeOpenLink');

					// 	e.preventDefault();
					// 	e.stopPropagation();
					// 	self.openedSizeMenu ? self.closeSizeMenu() : self.openSizeMenu();

					// 	// $sel.body.addClass("show-filter"); //открываем фильтры
					// });

					self.$sizeOpenBtn.on("click", function (e) { //раскрытие меню при клике
						console.log('sizeOpenBtn');

						e.preventDefault();
						e.stopPropagation();
						self.openedSizeMenu ? self.closeSizeMenu() : self.openSizeMenu();
					});

					$sel.window.on("click", function (e) {
						// console.log('$sel.window.on click');

						if (!$('.only-desktop_header-menu .open-search').length) {
							const searchIcon = $('.only-desktop_header-menu');
							const searchIconMobile = $('.only-mobile_header-menu');
							searchIcon.removeClass("open-search");
							searchIconMobile.removeClass("open-search");
						}

						if (!$(e.target).closest("#catalog-menu").length) {
							if (self.opened) {
								self.closeMenu();
							}
						}

						if (!$(e.target).closest("#catalog-search-menu").length) {
							if (self.openedSearchMenu) {
								self.closeSearchMenu();
							}

						}

						if (!$(e.target).closest("#catalog-basket").length) {
							if (self.openedBasketMenu) {
								if (!e.target.classList.contains('jcf-option')) {
									self.closeBasketMenu();
								}
							}
						}

						if (!$(e.target).closest("#catalog-size").length) {
							if (self.openedSizeMenu) {
								self.closeSizeMenu();
							}
						} else {
							console.log('$sel.window.on  else');
						}

						// console.log('!!!!!! = ', e.target.parentNode.classList.contains('show-filter'));
						// закрытие мерю при клике вне его области для Фильтров стр brand.html
						if (e.target.parentNode.classList.contains('show-filter')) {
							$sel.body.removeClass("show-filter");
							bodyScrollLock.enableBodyScroll($(".mobile-filter-scroll-holder", $sel.body)[0]);
							bodyScrollLock.enableBodyScroll($(".mobile-filter-scroll-inner", $sel.body)[0]);
						}

					});

					$(self.$dropdown, self.$buyerMenu).on("mouseenter click", function (e) { //наведение на пункт 'Покупателям'
						// console.log('наведение');
						e.preventDefault();
						e.stopPropagation();
						var $link = $(this);
						// убрать меню поиска .search-open
						self.closeSizeMenu();
						self.openBuyerMenu();
					});

					// $(self.$buyerMenuSections, self.$dropdown).on("mouseleave", function (e) { //уход с  пункт 'Покупателям'
					$(self.$buyerMenuSections, self.$dropdown).on("mouseleave", function (e) { //уход с  пункт 'Покупателям'
						// console.log('уход = ', self.$buyerMenuSections);
						// console.log('e.target = ', e.target);
						e.preventDefault();
						e.stopPropagation();
						var $link = $(this);
						self.closeBuyerMenu();


					});

					// наведение на все пункты меню кроме пункта 'Покупателям'
					// console.log('$(self.buyerMenuSectionsNotDropdown)= ',buyerMenuSectionsNotDropdown);
					const linksNotDropdown = document.querySelectorAll('.header-menu__list .header-menu__item:not(.catalog-dropdown)');
					// console.log('linksNotDropdown = ', linksNotDropdown);
					linksNotDropdown.forEach((item) => {
						item.addEventListener("mouseenter", function (e) { //наведение на все пункты меню кроме пункта 'Покупателям'
							// console.log('наведение/клик = ', item);
							// console.log('e.target = ', e.target);
							e.preventDefault();
							e.stopPropagation();
							var $link = $(this);
							self.closeBuyerMenu();
						});
					});

					self.$links.on("mouseover", function (e) { //наведение на пункты меню
						e.preventDefault();
						e.stopPropagation();

						var $link = $(this),
							$block = $($link.attr("href"), $sel.page);

						self.$links.removeClass("active");
						self.$blocks.removeClass("active");
						$block.addClass("active");
						$link.addClass("active");
					});
				},
				openMenu: function () {
					var self = this;
					// console.log('111openMenu');
					self.$menu.addClass("catalog-menu_visible");
					self.$btn.addClass("active");
					// очистить класы менюшек у боди т.е.закрыть их
					self.$buyerMenu.hide();
					$sel.body.removeClass('dropdown');
					$sel.body.removeClass('search-open');
					$sel.body.removeClass('show-filter');

					$sel.body.addClass("catalog-open");
					self.opened = true;
				},
				closeMenu: function () {
					var self = this;
					// console.log('111closeMenu');
					self.$menu.removeClass("catalog-menu_visible");
					self.$btn.removeClass("active");
					$sel.body.removeClass("catalog-open");
					self.opened = false;
				},
				openSearchMenu: function () {
					var self = this;

					self.$searchMenu.show();
					// очистить класы менюшек у боди т.е.закрыть их
					self.$buyerMenu.hide();
					$sel.body.removeClass('dropdown');
					$sel.body.removeClass('search-open');
					$sel.body.removeClass('show-filter');

					$sel.body.addClass("search-open");

					// console.log('self.html = ', $sel.html );
					$sel.html.addClass("overflow");

					self.openedSearchMenu = true;
				},
				closeSearchMenu: function () {
					var self = this;

					self.$searchMenu.hide();
					$sel.body.removeClass("search-open");
					// $sel.body.parentNode.classList.removeClass("overflow-x");
					console.log('self.html = ', $sel.html);
					$sel.html.removeClass("overflow");
					self.openedSearchMenu = false;
				},

				openBasketMenu: function () {
					var self = this;
					// console.log('2222openBasketMenu');
					self.$basketMenu.addClass("basket-menu_visible");
					self.$basketOpenBtn.addClass("active");
					// очистить класы менюшек у боди т.е.закрыть их
					self.$buyerMenu.hide();
					$sel.body.removeClass('dropdown');
					$sel.body.removeClass('search-open');
					$sel.body.removeClass('show-filter');

					$sel.body.addClass("basket-open");
					self.openedBasketMenu = true;
				},
				closeBasketMenu: function () {
					var self = this;
					// console.log('closeBasketMenu');
					self.$basketMenu.removeClass("basket-menu_visible");
					self.$basketOpenBtn.removeClass("active");
					$sel.body.removeClass("basket-open");
					self.openedBasketMenu = false;
				},

				openBuyerMenu: function () {
					console.log('openBuyerMenu');
					var self = this;
					// очистить класы менюшек у боди т.е.закрыть их
					self.$buyerMenu.hide();
					$sel.body.removeClass('dropdown');
					$sel.body.removeClass('search-open');
					$sel.body.removeClass('show-filter');

					self.$buyerMenu.show();
					$sel.body.addClass("dropdown");
					self.openedBuyerhMenu = true;
				},
				closeBuyerMenu: function () {
					// console.log('closeBuyerMenu');
					var self = this;

					self.$buyerMenu.hide();
					$sel.body.removeClass("dropdown");
					self.openedBuyerhMenu = false;
				},

				openSizeMenu: function () {
					// console.log('openSizeMenu 111');
					var self = this;

					self.$sizeMenu.addClass("size-menu_visible");
					self.$sizeOpenBtn.addClass("active");


					// new SimpleBar(self.$simplebar, { autoHide: false });
					// console.log('self.$simplebar = ',self.$simplebar);
					// const  scrool = self.$simplebar;
					// scrool.forEach((item) => {
					// 	new SimpleBar(item, {
					// 	  autoHide: false,
					// 	});
					//   })


					// очистить класы менюшек у боди т.е.закрыть их
					// self.$buyerMenu.hide();
					$sel.body.removeClass('dropdown');
					$sel.body.removeClass('size-open');
					$sel.body.removeClass('show-filter');

					$sel.body.addClass("size-open");
					self.openedSizeMenu = true;
				},
				closeSizeMenu: function () {
					var self = this;
					console.log('closeSizeMenu');

					self.$sizeMenu.removeClass("size-menu_visible");
					$sel.body.removeClass("size-open");
					self.openedSizeMenu = false;
				}
			},

			tooltips: {
				init: function ($container) {
					if (!$container) {
						$container = $sel.page;
					}
					$("[data-tooltip]", $container).each(function () {
						var $item = $(this),
							params = $item.data("tooltip");

						$item.tooltipster($.extend({
							content: (params.dest ? $(params.dest) : $item.attr("title")),
							contentAsHTML: true,
							animation: "fade",
							animationDuration: 100,
							arrow: true,
							interactive: true,
							side: "top",
							trigger: "custom",
							triggerOpen: {
								mouseenter: true,
								click: true,
								tap: true
							},
							triggerClose: {
								click: true,
								mouseleave: true,
								touchleave: true
							}
						}, params));
					});
				}
			},

			rotate: {
				init: function () {
					const tovarItems = document.querySelectorAll('.catalog-item');

					tovarItems.forEach((item) => {
						const catalogItemPhotoImg = item.querySelector('.catalog-item-photo-holder img');
						const imgSrcNew = catalogItemPhotoImg.getAttribute('data-imgsrcnew');
						const imgSrc = catalogItemPhotoImg.getAttribute('data-imgsrc');

						item.addEventListener('mouseover', (evt) => {
							if (imgSrcNew) { catalogItemPhotoImg.src = imgSrcNew; }
						});
						item.addEventListener('mouseout', () => {
							if (imgSrc) { catalogItemPhotoImg.src = imgSrc; }
						});
					});
				}
			},

			basket: {
				init: function () {
					$(".open-promocode").on("click", function (e) {
						e.preventDefault();
						$("#promocode-block").toggle();
					});

				}
			},

			pager: {
				init: function () {
					$sel.page.on("click", ".load-more", function (e) {
						var $link = $(this);
						(function ($link, href, $container, selector, callback) {
							$link.addClass("loading");
							$.ajax({
								url: href,
								data: {
									"IS_AJAX": "Y"
								},
								success: function (data) {
									var $data = $('<div />').append(data),
										$items = $data.find(selector),
										$preloader = $data.find(".page-toolbar");

									$items.addClass("loaded-item loaded-item--hidden");
									$link.closest(".page-toolbar").remove();

									$container.append($items);
									if ($preloader && $preloader.length) {
										$container.append($preloader);
									}
									setTimeout(function () {
										$container.find(".loaded-item--hidden").removeClass("loaded-item--hidden").addClass("loaded-item--visible");
									}, 50);
								}
							});
						})($link, $link.attr("href"), $($link.data("container")), $link.data("itemsselector"))

						e.preventDefault();
					});
				}
			},

			catalog: {
				init: function () {
					var self = this;

					self.slider();
					self.sorter();
					self.product();
				},

				product: function () {
					// console.log('product slider');
					// ------------------------------
					$(".product-photos-gallery").slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
						centerMode: true,
						arrows: false,
						variableWidth: false,

						responsive: [
							{
								breakpoint: 820,
								settings: {
									dots: true,
									vertical: false,
								}
							}
						]
					});


					// -----------------------------

					$(".product-photos-nav").on("init", function (e, s) {
						s.$slides.on("click", function () {
							s.$slides.removeClass("current");
							$(".product-photos").slick("slickGoTo", s.$slides.index($(this)));
						});
					}).slick({
						slidesToShow: 6,
						slidesToScroll: 1,
						arrows: true,
						infinite: false,
						dots: false,
						swipeToSlide: true,
						focusOnSelect: true,
						swipe: false,
						vertical: true,
						responsive: [
							{
								breakpoint: 1230,
								settings: 'unslick',
							}
						]
					});

					$(".product-photos").on("init", function (e, s) {
						$($(".product-photos-nav").slick("getSlick").$slides[0]).addClass("current");
					}).on("beforeChange", function (e, s, curSlide, nextSlide) {
						$(".product-photos-nav").slick("getSlick").$slides.removeClass("current");
						$($(".product-photos-nav").slick("getSlick").$slides[nextSlide]).addClass("current");
						$(".product-photos-nav").slick("slickGoTo", nextSlide);
					}).slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: false,
						arrows: false,
						infinite: false,
						vertical: true,

						responsive: [
							{
								breakpoint: 1230,
								settings: {
									dots: true,
									vertical: false,
								}
							}
						]

					});



					// ------------------------------



					$(".product-media", $sel.page).on("init", function (e, s) {
						if (s.slideCount == 1) {
							s.$dots.remove();
						}
					}).slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						mobileFirst: true,
						arrows: false,
						dots: true,
						responsive: [
							{
								breakpoint: 1100,
								settings: "unslick"
							}
						]
					});
				},

				sorter: function () {
					$(".catalog-toolbar-sorter", $sel.page).on("click", function (e) {
						e.stopPropagation();
						$(this).toggleClass("active");
					});
					$sel.window.on("click", function () {
						$(".catalog-toolbar-sorter", $sel.page).removeClass("active");
					});
				},

				slider: function () {
					$(".catalog-item-slider", $sel.body).each(function () {
						var $s = $(this),
							params = $s.data("params"),
							$h = $s.closest(".catalog-item"),
							$prevArr = $h.find(".catalog-item-slider-arrow.prev"),
							$nextArr = $h.find(".catalog-item-slider-arrow.next");
						$s.on("init", function (e, s) {

						}).slick($.extend({}, {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: false,
							arrows: true,
							infinite: false,
							autoplay: false,
							speed: 500,
							prevArrow: $prevArr,
							nextArrow: $nextArr,
						}, params));
					});


					$(".catalog-items--slider", $sel.body).each(function () {
						var $s = $(this),
							params = $s.data("params"),
							$h = $s.closest(".catalog"),
							$prevArr = $h.find(".slider-arrow.prev"),
							$nextArr = $h.find(".slider-arrow.next");
						$s.on("init", function (e, s) {

						}).slick($.extend({}, {
							slidesToShow: 6,
							slidesToScroll: 1,
							dots: false,
							arrows: true,
							infinite: true,
							autoplay: false,
							speed: 500,
							prevArrow: $prevArr,
							nextArrow: $nextArr,
							responsive: [
								{
									breakpoint: 1000,
									settings: {
										slidesToShow: 3,
										slidesToScroll: 1,
										arrows: false,
										speed: 200
									}
								},
								{
									breakpoint: 480,
									settings: {
										slidesToShow: 1.5,
										infinite: false,
										slidesToScroll: 1,
										arrows: false,
										speed: 200
									}
								}
							]
						}, params));
					});

					$(".filter-items", $sel.body).each(function () {
						var $s = $(this),
							params = $s.data("params"),
							$h = $s.closest(".catalog"),
							$prevArr = $h.find(".slider-arrow.prev"),
							$nextArr = $h.find(".slider-arrow.next");
						$s.on("init", function (e, s) {

						}).slick($.extend({}, {
							slidesToShow: 5,
							slidesToScroll: 2,
							dots: false,
							arrows: true,
							infinite: false,
							autoplay: false,
							speed: 500,
							prevArrow: $prevArr,
							nextArrow: $nextArr,
							responsive: [
								{
									breakpoint: 1000,
									settings: {
										slidesToShow: 4,
										slidesToScroll: 1,
										arrows: false,
										speed: 200
									}
								},
								{
									breakpoint: 500,
									settings: {
										slidesToShow: 3,
										slidesToScroll: 1,
										arrows: true,
										speed: 200
									}
								}
							]
						}, params));
					});

					$(".catalog-items--slider-watched", $sel.body).each(function () {
						var $s = $(this),
							params = $s.data("params"),
							$h = $s.closest(".slider-prev-watched");
						$prevArr = $h.find(".slider-arrow.prev"),
							$nextArr = $h.find(".slider-arrow.next");
						$s.on("init", function (e, s) {

						}).slick($.extend({}, {
							slidesToShow: 6,
							slidesToScroll: 1,
							dots: false,
							arrows: true,
							infinite: true,
							autoplay: false,
							speed: 500,
							prevArrow: $prevArr,
							nextArrow: $nextArr,
							responsive: [
								{
									breakpoint: 1000,
									settings: {
										slidesToShow: 3,
										slidesToScroll: 1,
										arrows: false,
										speed: 200
									}
								},
							]
						}, params));
					});




				},
			},

			filter: {
				outTimer: null,
				$filter: null,
				$tabs: null,
				$content: null,
				$headings: null,

				$currentHeading: null,
				$currenTab: null,

				brands: {
					itemWidth: 250,
					rowsCount: 7
				},

				all: {
					itemWidth: 250,
					rowsCount: 7,
					minItems: 21
				},

				init: function () {
					var self = this;

					self.$toolbar = $(".catalog-toolbar", $sel.page);

					if (!self.$toolbar.length) {
						return false;
					}

					self.$filter = $(".filter", $sel.page);
					self.$headings = $(".filter-heading-item", self.$filter);
					self.$content = $(".filter-content", $sel.page);
					self.$tabs = $(".filter-content-item", self.$page);

					self.tabs();

					self.price();

					self.handle();


					//self.$content.css("top", self.$toolbar.offset().top + self.$toolbar.height());

					$(".page-heading-filter-item", $sel.page).on("click", function (e) {
						e.preventDefault();

						var $item = $(this);

						if ($item.hasClass("page-heading-filter-item--clear")) {
							$item.siblings().fadeOut(250);
						}
						$item.fadeOut(300);

					});
				},

				tabs: function () {
					var self = this;

					self.$headings.on("click mouseover", function (e) {
						e.stopPropagation();

						clearTimeout(self.outTimer);

						var $heading = $(this),
							$tab = self.$tabs.filter($heading.data("filter"));

						// Заголовки фильтра
						self.$headings.removeClass("active");
						$heading.addClass("active");
						self.$currentHeading = $heading;

						// Содержимое таба
						self.$currenTab = $tab;

						// Обработка случая брендов
						if (self.$currenTab.hasClass("filter-content-item--brands") && !self.$currenTab.hasClass("make")) {
							setBrandsFilter();
						}

						// Обработка случая других фильтров
						if (self.$currenTab.hasClass("filter-content-item--all") && !self.$currenTab.hasClass("make")) {
							setAllFilter();
						}

						// Показ таба
						self.$tabs.removeClass("active");
						self.$currenTab.css("left", (self.$currenTab.hasClass("filter-content-item--fullwidth") ? 0 : $heading.position().left)).addClass("active");
					});


					// Обработка сторонних кликов
					self.$tabs.on("click", function (e) {
						e.stopPropagation();
					}).on("mouseenter", function () {
						clearTimeout(self.outTimer);
					});
					$sel.window.on("click", function () {
						if (self.$currentHeading && self.$currenTab) {
							self.$currentHeading.removeClass("active");
							self.$currenTab.removeClass("active");
						}
					});


					self.$headings.add(self.$tabs).on("mouseleave", function () {
						self.outTimer = setTimeout(function () {
							self.$headings.removeClass("active");
							self.$tabs.removeClass("active");
						}, 500);
					});


					// Формирование фильтра брендов
					function setBrandsFilter() {
						var $rows = self.$currenTab.find(".brands-indexes-rows"),
							$items = $rows.find(".brands-index-row-items");
						$items.each(function () {
							var $item = $(this),
								$itemRows = $item.find(".filter-row"),
								itemColsCount = Math.ceil($itemRows.length / self.brands.rowsCount),
								itemWidth = parseInt(itemColsCount * self.brands.itemWidth);
							$item.css({
								"column-count": itemColsCount,
								"width": itemWidth
							});
						});

						var $scroll = self.$currenTab.find(".brands-indexes-scroll");
						if ($scroll.data("scroll")) {
							$scroll.data("scroll").recalculate();
						} else {
							$scroll.data("scroll", new SimpleBar($scroll[0], {
								autoHide: false
							}));
						}

						$(".brands-letters-item", self.$currenTab).on("click", function (e) {
							e.preventDefault();

							var $block = self.$currenTab.find(".brands-index-row[data-letter='" + $(this).data("letter") + "']");
							$scroll.data("scroll").getScrollElement().scrollTo($block.position().left, 0);
							$block.addClass("blink");
							setTimeout(function () {
								$block.removeClass("blink");
							}, 1500);
						});

						// Флаг инициализации фильтра
						self.$currenTab.addClass("make");
					}


					// Формирование фильтра "Другие"
					function setAllFilter() {
						var $innerTabs = self.$currenTab.find(".filter-inner-tabs");

						// Скролл для списка внутренних табов
						new SimpleBar($innerTabs.find(".scrollable-tabs")[0], {
							autoHide: false
						});

						// Клик по внутреннему табу
						$(".filter-inner-tab-item", self.$currenTab).on("click", function () {
							$(".filter-inner-tab-item", self.$currenTab).removeClass("active");
							$(".filter-inner-content-item", self.$currenTab).removeClass("active");

							var $item = $(this);
							$item.addClass("active");
							$($item.data("innertab")).addClass("active");
							makeScroll();
						});

						makeScroll();

						// Скролл для контента внутренних табов
						function makeScroll() {
							var $content = self.$currenTab.find(".filter-inner-content-item.active");
							if (!$content.data("scroll")) {
								var $rowsHolder = $content.find(".filter-rows"),
									$rows = $rowsHolder.find(".filter-row");
								if ($rows.length <= self.all.minItems) {
									$content.data("scroll", "no");
								} else {
									var columnCount = Math.ceil($rows.length / self.all.rowsCount);
									$rowsHolder.css({
										"width": (columnCount * self.all.itemWidth),
										"column-count": columnCount
									});
									$content.data("scroll", new SimpleBar($content.find(".scrollable-content")[0], {
										autoHide: false
									}));
								}

							} else if ($content.data("scroll") != "no") {
								$content.data("scroll").recalculate();
							}
						}

						// Флаг инициализации фильтра
						self.$currenTab.addClass("make");
					}

				},

				handle: function () {
					var self = this;

					$("input:checkbox", self.$content).on("change", function () {
						var $holder = $(this).closest(".filter-content-item"),
							$heading = self.$headings.filter("[data-filter='#" + $holder.attr("id") + "']");
						if ($holder.find("input:checked").length) {
							$heading.addClass("selected");
						} else {
							$heading.removeClass("selected");
						}
					});

					$(".form-item--range", self.$content).on("change input", function (e, u) {
						var $holder = $(this).closest(".filter-content-item"),
							$heading = self.$headings.filter("[data-filter='#" + $holder.attr("id") + "']"),
							$range = $(this);

						console.log('form-item--range = ', $range[0].valueLow + "," + $range[0].valueHigh, $range.data("value"));

						if ($range[0].valueLow + "," + $range[0].valueHigh != $range.data("value")) {
							$heading.addClass("selected");
						} else {
							$heading.removeClass("selected");
						}
					});
				},

				price: function () {
					var self = this;


					$(".filter-price", $sel.filter).each(function () {

						console.log('!!! filter-price !!! = ');

						(function ($priceFilter) {
							$(".form-item--range", $priceFilter).on("change input", function (e, u) {
								syncPriceFilter("slider", $priceFilter);
							});
							$(".filter-price-field", $priceFilter).on("change", function () {
								syncPriceFilter("field", $priceFilter);
							});

							syncPriceFilter("field", $priceFilter);
						})($(this));
					});

					function syncPriceFilter(source, $priceFilter) {
						var $from = $(".filter-price-field--from", $priceFilter),
							$to = $(".filter-price-field--to", $priceFilter),
							$range = $(".form-item--range", $priceFilter),
							rangeMin = parseInt($range.attr("min")),
							rangeMax = parseInt($range.attr("max")),
							fromVal, toVal;

						if (source == "slider") {
							fromVal = $range[0].valueLow,
								toVal = $range[0].valueHigh;
						} else if (source == "field") {
							fromVal = $from.val().replace(/ /g, ""),
								toVal = $to.val().replace(/ /g, "");

							if (fromVal >= rangeMax || fromVal <= rangeMin) {
								fromVal = rangeMin;
							}

							if (toVal >= rangeMax || toVal <= rangeMin) {
								toVal = rangeMax;
							}

							var inst = jcf.getInstance($range);
							if (inst) {
								inst.values = [fromVal, toVal];
								inst.refresh();
							}
						}

						$from.val(formatValue(fromVal));
						$to.val(formatValue(toVal));
					}

					function formatValue(value) {
						var strValue = value.toString(),
							formatStrValue = [];
						for (var len = strValue.length, i = len, j = 0; i >= 0; i--) {
							formatStrValue.push(strValue[i]);
							if (j == 3) {
								formatStrValue.push(' ');
								j = 0;
							}
							j++;
						}
						return formatStrValue.reverse().join("");
					}
				}
			},

			forms: {
				init: function () {
					var self = this;

					self.customize();
					self.validation();

					self.captcha.init();
				},

				captcha: {
					loaded: false,
					init: function () {
						var self = this;

						$(".form-captcha-reload", $sel.page).on("click", function () {
							var $reload = $(this),
								$holder = $(this).closest(".form-captcha"),
								$img = $holder.find("img");

							self.reload($reload.data("href"), $img);
						});
					},

					reload: function (captchaUrl, $img) {
						var self = this;

						if (self.loaded) {
							return false;
						}

						$.ajax({
							url: captchaUrl,
							dataType: "json",
							complete: function () {
								self.loaded = false;
							},
							success: function (data) {
								$img.attr("src", data.img);
							}
						});
					}
				},

				customize: function ($container) {
					if (!$container) {
						$container = $sel.body;
					}

					jcf.replace($(".form-item--number", $container));

					jcf.replace($(".form-item--checkbox", $container));

					jcf.replace($(".form-item--radio", $container));

					jcf.replace($(".form-item--range", $container));

					jcf.replace($(".form-item--number", $container));

					jcf.replace($(".jcf-scrollable", $container));

					$('.tooltip').tooltipster({
						contentCloning: true,
						animation: 'fall',
						delay: 200,
						theme: 'tooltipster-white',
						trigger: 'click',
						side: 'right',
						// timer: 5000,
						repositionOnScroll: true,
						selfDestruction: true,
						arrow: false,
						interactive: true,
						// minWidth: 400
						functionReady: function () {
							$('.tooltip__close').click(function () {
								$('.product-add-favorites').tooltipster('hide');
							});
						}
					});

					// window.addEventListener('scroll', function(e) {
					// 	// debugger
					// 	const tooltipster = document.querySelector('.tooltipster-white');
					// 	// console.log('tooltipster = ',tooltipster);

					// 	if(tooltipster){  
					// 		// tooltipster.classList.remove('tooltipster-show');
					// 		// tooltipster.classList.remove('tooltipster-fade');
					// 		tooltipster.classList.remove('tooltipster-base');
					// 	}
					// });

					const maxGoods = 20;
					$(".form-item--number").change(function () {
						const productSizeTooltip = document.querySelector('.product-size-tooltip');
						// debugger
						var res = $(this).val();

						console.log('res = ', res);

						if (res > maxGoods) { $(this).val(res.substring(0, 3)); }
						if (res == maxGoods) {
							console.log('productSizeTooltip = ', productSizeTooltip);

							productSizeTooltip.click();//открываю tooltip о макс кол-ве товаров
						}
					});

					// ------------tooltip----------------------					
					$('.product-like').on("click", function (e) { //раскрытие меню при клике
						const productSizeTooltip = document.querySelector('.product-add-favorites');
						productSizeTooltip.click();//открываю tooltip о добавлении в избранное
						$('.product-like').toggleClass('active-like');//добавляю акт класс сердечку
						$('.btn.basket-open').innerHTML = 'В КОРЗИНЕ';//меняю иконку и надпись на кнопке 'в корзину'
					});

					$(window).keypress(function () {
						$('.product-add-favorites').tooltipster('close');
						// $('.product-like').toggleClass('active-like');//добавляю акт класс сердечку
					});
						

					$(".form-item--calendar", $container).each(function () {
						var $calendar = $(this);

						$calendar.datepicker({
							autoClose: true
						});
					});

					$(".form-item--file", $container).each(function () {
						(function ($file) {
							var $holder = $file.closest(".form-file-holder"),
								$items = $holder.find(".form-file-items");
							$file.fileupload({
								dataType: "json",
								done: function (e, data) {
									var $files = "";
									console.log(data);
									$.each(data.result.files, function (index, file) {
										$files += '<div class="form-file-item"><div class="form-file-item-title">' + file.name + '</div></div>'
									});
									$items.empty().append($files);
								}
							});
						})($(this));

					});

					// Select
					jcf.setOptions("Select", {
						wrapNative: false,
						wrapNativeOnMobile: false,
						maxVisibleItems: 10,
						fakeDropInBody: false
					});
					$(".form-item--select", $container).each(function () {
						var $select = $(this);

						if ($select.attr("placeholder")) {
							$select.prepend('<option class="hideme" selected>' + $select.attr("placeholder") + '</option>');
						}
						jcf.replace($select);
					});

					$(".form-item--select-top", $container).each(function () {
						var $select = $(this);

						if ($select.attr("placeholder")) {
							$select.prepend('<option class="hideme" selected>' + $select.attr("placeholder") + '</option>');
						}
						jcf.replace($select);
					});

					$(".password-show", $container).on("click", function (e) {
						e.preventDefault();

						var $toggle = $(this),
							$field = $toggle.closest(".form-row").find("input");

						$toggle.toggleClass("show");
						$toggle.hasClass("show") ? $field.attr("type", "text") : $field.attr("type", "password");
					});


					$(".form-item--autocomplete", $container).each(function () {
						var $item = $(this),
							params = $item.data("autocomplete");

						//console.log(params.href);

						$item.autocomplete({
							minChars: 1,
							serviceUrl: params.href,
							dataType: "json",
							formatResult: function (suggestion, currentValue) {
								var strItem = '',
									itemName = suggestion.value.replace(new RegExp(ALLTIME.utils.escapeRegExp(currentValue), 'g'), "<b>" + currentValue + "</b>");
								strItem += '<div class="autocomplete-item">' + itemName + '</div>';
								return strItem;
							}
						});
					});


				},

				validation: function ($container) {
					if (!$container) {
						$container = $sel.body;
					}

					$.validator.addMethod("phoneRU", function (phone_number, element) {
						phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
						return this.optional(element) || phone_number.length > 5 && phone_number.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/);
					}, "Error");
					$.validator.setDefaults({
						errorClass: "form-item--error",
						errorElement: "span"
					});
					$(".form", $container).each(function () {
						var $form = $(this),
							formParams = {
								rules: {},
								messages: {}
							},
							$formFields = $form.find("[data-validation]");

						$formFields.each(function () {
							var $field = $(this),
								fieldParams = $field.data("validation");

							formParams.messages[$field.attr("name")] = fieldParams.message ? fieldParams.message : "";

							formParams.rules[$field.attr("name")] = {};
							if (fieldParams.pattern) {
								formParams.rules[$field.attr("name")][fieldParams.pattern] = true;
							}
							if (fieldParams.mask) {
								$field.mask(fieldParams.mask, {
									autoclear: true,
									placeholder: "_"
								});
							}
							if (fieldParams.equalTo) {
								formParams.rules[$field.attr("name")]["equalTo"] = fieldParams.equalTo;
							}
							if (fieldParams.minlength) {
								formParams.rules[$field.attr("name")]["minlength"] = fieldParams.minlength;
							}
						});

						if ($form.data("success")) {
							formParams.submitHandler = function (form) {
								$.ajax({
									url: $form.attr("action"),
									data: $form.serialize()
								});
								$.magnificPopup.open({
									items: {
										src: $form.data("success"),
										type: "inline"
									},
									mainClass: "mfp-fade",
									removalDelay: 300
								});
							};
							console.log(formParams);
						}



						$form.validate(formParams);
					});
				}
			},


			searchForm: {
				init: function () {

					$(".search-form input", $sel.page).on("input", function (ev) {
						if (ev.target.value !== '')
							$(ev.target).next().addClass('input__clear_visibility_visible');

					});

					$(".search-form__clear").on("click", function (e) {
						e.preventDefault();
						const parent = e.target.parentNode;
						const input = parent.querySelector('.search-form__input');
						input.value = '';
					});
				}
			},

			note: {
				init: function () {
					$(".page-note-close", $sel.page).on("click", function () {
						$(this).closest(".page-note").hide();
					});
				}
			},

			glossary: {
				init: function () {
					var $field = $(".glossary-search", $sel.page),
						$blocks = $(".glossary-block", $sel.page),
						$links = $(".glossary-block a", $sel.page);
					$field.on("keyup", function () {
						var search = $field.val();
						if (!search) {
							$links.removeClass("disabled");
						} else {
							search = search.toLowerCase();
							$links.filter(function () {
								var linkText = $(this).text().toLowerCase();
								return (linkText.indexOf(search) == -1);
							}).addClass("disabled");
						}
					});
				}
			},

			popups: {
				params: {
					type: "ajax",
					mainClass: "mfp-fade",
					removalDelay: 300,
					tClose: "Закрыть (ESC)",
					tLoading: "Загрузка...",
					callbacks: {
						beforeOpen: function () {
							$(".mobile-nav-holder .mobile-close", $sel.body).trigger("click");
						},
						ajaxContentAdded: function () {
							PROJECT.forms.customize($(this.container));
							PROJECT.forms.validation($(this.container));
							$(".catalog-items--slider").slick("setPosition");
						},
						open: function () {
							PROJECT.forms.customize($(this.container));
							PROJECT.forms.validation($(this.container));
							$(".catalog-items--slider").slick("setPosition");
						},
						change: function () {

						}
					},
					fixedContentPos: true,
					overflowY: "scroll"
				},
				init: function ($container) {
					var self = this;

					if (!$container) {
						var $container = $sel.body;
					}

					$("[data-popup]", $container).each(function () {
						(function ($p) {
							var params = $p.data("popup");
							$p.magnificPopup($.extend({}, self.params, params));
						})($(this));
					});

					$sel.body.on("click", ".popup-close", function (e) {
						e.preventDefault();
						$.magnificPopup.close();
					});
				}
			},

			accordion: {
				$opened: false,
				init: function () {
					var self = this;
					$(".accordion-item-heading").on("click", function () {
						var $item = $(this).closest(".accordion-item");
						if ($item.hasClass("opened")) {
							self.hide($item);
							return false;
						}
						if (self.$opened) {
							self.hide(self.$opened);
						}
						self.show($item);
					});
				},
				show: function ($item) {
					var self = this,
						$content = $item.find(".accordion-item-content");
					$item.addClass("opened");
					$content.css("display", "block");
					$content.addClass("show");
					self.$opened = $item;


				},
				hide: function ($item) {
					var self = this,
						$content = $item.find(".accordion-item-content");
					$item.removeClass("opened");
					$content.removeClass("show");
					$content.css("display", "none");

					self.$opened = false;
				}
			},

			tabs: {
				init: function () {
					var self = this;

					$sel.body.on("click", "[data-tab]", function (e) {
						var $tabItem = $(this);
						if ($tabItem.hasClass("active")) {
							return false;
						}

						var $tabItems = $("[data-tabs='" + $tabItem.data("tabs") + "']", $sel.body),
							$tabContent = $($tabItem.data("tab"), $sel.body),
							$tabs = $($tabItem.data("tabs"), $sel.body);
						$tabItems.removeClass("active");
						$tabItem.addClass("active");

						var $activeTab = $tabs.filter(".active");
						$activeTab.removeClass("active");
						$tabContent.addClass("active");
					});
				}
			},

			mobile: {
				init: function () {
					var self = this;

					self.nav();
					self.submenu();
					self.search();
					self.filter();
					self.mobileBlocks.init();
				},

				nav: function () {
					$(".header-burger", $sel.body).on("click", function () {
						$sel.body.addClass("show-menu");
						bodyScrollLock.disableBodyScroll($(".mobile-nav-scroll-holder", $sel.body)[0]);
						bodyScrollLock.disableBodyScroll($(".mobile-nav-scroll-inner", $sel.body)[0]);
					});
					$(".mobile-nav-holder .mobile-close", $sel.body).on("click", function () {
						$sel.body.removeClass("show-menu");
						bodyScrollLock.enableBodyScroll($(".mobile-nav-scroll-holder", $sel.body)[0]);
						bodyScrollLock.enableBodyScroll($(".mobile-nav-scroll-inner", $sel.body)[0]);
					});
				},

				search: function () {
					$(".header-toolbar-item--search").on("click", function () {
						$sel.body.toggleClass("search-open");
					});
				},

				submenu: function () {
					$(".mobile-nav-menu-item-holder--has-submenu", $sel.body).on("click", function (e) {
						e.preventDefault();
						$(this).toggleClass("open");
					});
					$(".footer-menu-title", $sel.body).on("click", function (e) {
						e.preventDefault();
						$(this).parent().toggleClass("open");
					});
					$(".footer-menu a.footer-menu-item--large, .mobile-nav-menu-item-holder--has-submenu nav a", $sel.body).on("click", function (e) {
						e.stopPropagation();
					});
				},

				filter: function () {
					$(".mobile-filter-open", $sel.body).on("click", function (e) {
						// console.log('!!! mobile-filter-open click !!!!');
						e.preventDefault();
						$sel.body.addClass("show-filter");
						// $sel.body.toggleClass("show-filter");
						bodyScrollLock.disableBodyScroll($(".mobile-filter-scroll-holder", $sel.body)[0]);
						bodyScrollLock.disableBodyScroll($(".mobile-filter-scroll-inner", $sel.body)[0]);
					});
					$(".mobile-filter-close", $sel.body).on("click", function () {
						$sel.body.removeClass("show-filter");
						bodyScrollLock.enableBodyScroll($(".mobile-filter-scroll-holder", $sel.body)[0]);
						bodyScrollLock.enableBodyScroll($(".mobile-filter-scroll-inner", $sel.body)[0]);
					});

					$(".mobile-filter-item-heading", $sel.body).on("click", function () {
						$(this).closest(".mobile-filter-item").toggleClass("open");
					});

					$(".mobile-filter input:checkbox").on("change", function () {
						// console.log('input:checkbox');

						var $holder = $(this).closest(".mobile-filter-item");
						$holder.find("input:checked").length ? $holder.addClass("selected") : $holder.removeClass("selected");

						if ($(".mobile-filter-item.selected").length) {
							$(".mobile-filter-open", $sel.body).addClass("selected");
						} else {
							$(".mobile-filter-open", $sel.body).removeClass("selected");
						}
					});

					$(".mobile-filter input:radio").on("change", function () {
						// console.log('input:radio');

						var $holder = $(this).closest(".mobile-filter-item");
						$holder.find("input:checked").length ? $holder.addClass("selected") : $holder.removeClass("selected");

						if ($(".mobile-filter-item.selected").length) {
							$(".mobile-filter-open", $sel.body).addClass("selected");
						} else {
							$(".mobile-filter-open", $sel.body).removeClass("selected");
						}
					});

					$(".mobile-filter .form-item--range").on("change input", function (e, u) {
						// console.log('form-item--range change input');

						var $holder = $(this).closest(".mobile-filter-item"),
							$range = $(this);

						$('.filter-price-field--from')[0].value = $range[0].valueLow;
						$('.filter-price-field--to')[0].value = $range[0].valueHigh;

						($range[0].valueLow + "," + $range[0].valueHigh != $range.data("value")) ? $holder.addClass("selected") : $holder.removeClass("selected");
					});
					$(".mobile-filter .mobile-filter-heading-reset").on("click", function (e) {
						console.log('filter-reset');
						// e.preventDefault();
						// e.stopPropagation();

						$(".mobile-filter-item").removeClass("selected");
						$(".mobile-filter-holder .mobile-close", $sel.page).trigger("click");
					});
					$(".mobile-filter button:submit").on("click", function (e) {

						console.log('submit');
						e.preventDefault();
						$(".mobile-filter-holder .mobile-close", $sel.body).trigger("click");
					});


				},

				mobileBlocks: {
					$panel: false,
					$blocksHolder: false,
					$blocks: false,
					$curBlock: false,

					init: function () {
						var self = this;

						self.$panel = $(".mobile-nav", $sel.body);
						self.$blocksHolder = $(".mobile-blocks", self.$panel);
						self.$blocks = $(".mobile-block", self.$blocksHolder);
						self.$curBlock = self.$blocks.filter(".show");

						self.build();
						self.handle();
					},

					build: function () {
						var self = this;

						self.$blocks.filter("[data-prev]").each(function () {
							var $block = $(this);

							$block.prepend('<a href="' + $block.data("prev") + '" class="mobile-back mobile-open-block">Назад</a>');
						})
					},

					handle: function () {
						var self = this;

						$(".mobile-open-block", self.$panel).on("click", function (e) {
							e.preventDefault();

							var $item = $(this),
								$newBlock = self.$blocks.filter($item.attr("href"));

							self.$curBlock.removeClass("show");
							$newBlock.addClass("show");

							self.$curBlock = $newBlock;

							self.$panel.scrollTop(0);
						});
					}
				}
			},

			map: {
				init: function () {
					// -------------map.html------------------------
					// -  данные для каталога магазинов стр shops.html
					const shops = [
						{
							id: 0,
							name: 'BRUSNIKA «Ереван Плаза»',
							coords: [55.70873406903462, 37.622090999999976],
							img: 'shop-1.png',
							address: 'м. Войковская, м. Тульская, ул. Большая Тульская, д. 13, ТРЦ "Ереван Плаза", 2 этаж',
							time: 'Пн-Вс: с 10:00 до 22:00',
							phone: '8 926 734 07 15'
						},
						{
							id: 1,
							name: 'BRUSNIKA «АФИМОЛЛ Сити»',
							coords: [55.74916156898958, 37.53974249999992],
							img: 'shop-1.png',
							address: 'м. Деловой центр, Пресненская наб., д. 2, ТРЦ «АФИМОЛЛ Сити», 3 этаж ',
							time: 'Вс-Чт: с 10:00 до 22:00, Пт-Сб: с 10:00 до 23:00',
							phone: '8 985 926 51 36'
						},
						{
							id: 2,
							name: 'BRUSNIKA «Капитолий»',
							coords: [55.691963069051084, 37.527965499999965],
							img: 'shop-1.png',
							address: 'м. Университет, пр-т Вернадского, д. 6, ТЦ «Капитолий», 2 этаж',
							time: 'Пн-Вс: с 10:00 до 22:00',
							phone: '8 985 926 51 36'
						},
						{
							id: 3,
							name: 'BRUSNIKA «Метрополис»',
							coords: [55.82387906891326, 37.497215999999966],
							img: 'shop-1.png',
							address: 'Адрес: м. Войковская, Ленинградское ш., д. 16А, ТЦ "Метрополис", 2 этаж',
							time: 'Режим работы: Пн-Вс: с 10:00 до 23:00',
							phone: '8 919 720 04 57'
						},
						{
							id: 4,
							name: 'BRUSNIKA «Авиапарк»',
							coords: [55.79023106894601, 37.531288999999965],
							img: 'shop-1.png',
							address: 'м. ЦСКА, Ходынский бульвар, д. 4, ТЦ «Авиапарк», 2 этаж',
							time: 'Вс-Чт: с 10:00 до 22:00',
							time1: 'Пт-Сб: с 10:00 до 23:00',
							phone: '8 985 115 95 42'
						},
						{
							id: 5,
							name: 'BRUSNIKA «Европарк»',
							coords: [55.76621756897374, 37.38087549999998],
							img: 'shop-1.png',
							address: 'м. Крылатское, Рублевское шоссе, д. 62, МТК «Европарк», 1 этаж',
							time: 'Пн-Вс: с 10:00 до 22:00',
							phone: '8 964 646 82 34'
						},
						{
							id: 6,
							name: 'BRUSNIKA Лесная',
							coords: [55.7786435689461, 37.58941000000001],
							img: 'shop-1.png',
							address: 'г. Москва, м. Белорусская, ул. Лесная, д. 10-16',
							time: 'Пн-Вс: с 10:00 до 22:00',
							phone: '8 919 720 04 32'
						},
						{
							id: 7,
							name: 'BRUSNIKA «Модный Сезон»',
							coords: [55.757131068980215, 37.61711450000001],
							img: 'shop-1.png',
							address: 'м. Охотный ряд, ул.Охотный ряд., д. 2, ТГ «Модный сезон», 2 этаж',
							time: 'Пн-Вс: с 10:00 до 22:00',
							phone: '8 926 419 36 33'
						},
					]

					const lengthShops = Object.keys(shops).length;
					const placemarks = [];

					// начинаем строить точки на карте
					ymaps.ready(init);

					function init() {
						const mobileWidth = 480;

						var myMap = new ymaps.Map('map', {
							center: [55.757131068980215, 37.61711450000001],
							zoom: 11,
						}, {
							searchControlProvider: 'yandex#search'
						});

						// размещаем точки на карте
						for (let i = 0; i < lengthShops; i++) {

							placemarks[i] = new ymaps.Placemark(shops[i].coords,
								{
									balloonContentHeader: `<img src="../dummy/shops/${shops[i].img}" width="100%" >`,
									balloonContentBody: ` <div class="item-shop-title item-shop-title--onmap">${shops[i].name}</div>` +
										`<div class="item-shop-address item-shop-address--onmap">${shops[i].address}</div>` +
										`<div class="item-shop-time item-shop-time--onmap">${shops[i].time}</div>`,
									balloonContentFooter: ` <div class="item-shop-phone item-shop-phone--onmap"> <a href="tel:${shops[i].phone}">${shops[i].phone}</a></div>`,
									hintContent: `${shops[i].name}`
								},
								{
									// Опции.
									// Необходимо указать данный тип макета.
									iconLayout: 'default#image',
									// Своё изображение иконки метки.
									iconImageHref: '../dummy/shops/placemark.svg',
									// Размеры метки.
									iconImageSize: [30, 30],
									// Смещение левого верхнего угла иконки относительно
									// её "ножки" (точки привязки).
									iconImageOffset: [-12, 0],
									// не скрываем метку на карте при открытии балуна
									hideIconOnBalloonOpen: false
								},
							);

							// устанавливаю мах ширину балуна
							placemarks[i].options.set('balloonMaxWidth', 300);

							// устанавливаю мин высоту балуна для мобилки
							const windowWidth = window.innerWidth;
							if (windowWidth <= mobileWidth) {
								placemarks[i].options.set('balloonMinHeight', 300);
							}

							//Добавим изменение метки при наведении 
							toggleHoverActivePlaceMark(placemarks[i]);
							//Добавим изменение метки при клике 
							toggleClickActivePlaceMark(placemarks[i]);

							if (windowWidth <= mobileWidth) {
								//добавляем на метку событие всплытия попапа
								placemarks[i].events
									.add('click', function (e) {
										// вызов попапа
										$.magnificPopup.open({
											items: {
												src: '#popup-' + i,
												type: "inline"
											},
											mainClass: "mfp-fade",
											removalDelay: 300
										});
										//удаляем всплытие балуна по клику
										e.preventDefault();
										e.stopPropagation();
									});
							}

							// Добавим i-ю метку на карту.
							myMap.geoObjects.add(placemarks[i]);

						};


						const myCollection = myMap.geoObjects;

						// добавляем событие при клике на точку карты
						myMap.geoObjects.events.add('click', function (e) {
							console.log('событие при клике на точку карты');
							// Получение ссылки на дочерний объект, на котором произошло событие.
							var object = e.get('target');
							//Добавим изменение метки при наведении и при клике
							
							object.options._options.iconImageHref = '../dummy/shops/placemark-active.svg'
							// object.options.set('preset', 'active#image');

							// коллекция точек на карте ?
							// if (myCollection.activeIndex !== undefined){
							// 	console.log('!!!!!!');
							// }
						
						});

						//функция смены акт картинки у метки при наведении
						function toggleHoverActivePlaceMark(placemark) {
							console.log('смена метки при наведении');
							placemark.events
							.add('mouseenter', function (e) {
								e.get('target').options._options.iconImageHref = '../dummy/shops/placemark-active.svg'
								e.get('target').options.set('preset', 'active#image');
							})
							.add('mouseleave', function (e) {
								e.get('target').options._options.iconImageHref = '../dummy/shops/placemark.svg'
								e.get('target').options.unset('preset');
							})

						}
						//функция смены акт картинки у метки при клике
						function toggleClickActivePlaceMark(placemark) {
							console.log('смена метки при клике');
							placemark.events
							.add('click', function (e) {
								e.get('target').options._options.iconImageHref = '../dummy/shops/placemark-active.svg'
								e.get('target').options.set('preset', 'active#image');
							})
						}

						// – Если в адресной строке присутствует параметр id, 
						// то выполнить код по открытию метки

						if (window.location.href.indexOf('?id') >= 0) {
							const pathname = window.location.href;
							const id = pathname.split("=")[1];
							const windowWidth = window.innerWidth;

							if (windowWidth > mobileWidth) {
								// имитирую клик по соот точке
								placemarks[id].events.fire('click');

							} else {
								// вызов попапа без имитации клика по точке 
								$.magnificPopup.open({
									items: {
										src: '#popup-' + id,
										type: "inline"
									},
									mainClass: "mfp-fade",
									removalDelay: 300
								});

							}

							// установить центр карты по метке
							myMap.setCenter(placemarks[id].geometry.getCoordinates());

						}

					};


				}
			},
		};

	})();

	window.PROJECT = PROJECT;
	PROJECT.init();

})(jQuery);

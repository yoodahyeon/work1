// 메인 팝업 닫기
$('[class^=main-popup] .btn-close').on('click', function () {
  $('[class^=main-popup]').removeClass('on');
  $('html').css('overflow', '');
})

// 슬라이드 멈춤/재생
function setupSliderControls(wrapperSelector, sliderInstance) {
  const $wrapper = $(wrapperSelector);

  // 슬라이드 클릭 시 autoplay 멈춤
  $wrapper.on('click focusin', '.swiper-slide', function () {
    $wrapper.find('.button-pause').addClass('play');
    sliderInstance.autoplay.stop();
  });

  // 일시정지/재생 버튼 클릭
  $wrapper.on('click', '.button-pause', function () {
    const $btn = $(this);
    if (!$btn.hasClass('play')) {
      $btn.addClass('play');
      sliderInstance.autoplay.stop();
    } else {
      $btn.removeClass('play');
      sliderInstance.autoplay.start();
    }
  });

  // 화살표 클릭 시 autoplay 멈춤
  $wrapper.on('click', '[class^=swiper-button]', function () {
    const $pauseBtn = $wrapper.find('.button-pause');
    if (!$pauseBtn.hasClass('play')) {
      $pauseBtn.addClass('play');
      sliderInstance.autoplay.stop();
    }
  });
}

$('#header [class*=select-list-], #header .m-select-list').on('click', function (e) {
  e.preventDefault();
  if (!$(this).find('.select-list').is(':visible')) {
    $(this).addClass('on').find('.select-list').slideDown();
    $(this).siblings().removeClass('on').find('.select-list').slideUp();
  } else {
    $(this).removeClass('on').find('.select-list').slideUp();
  }
})

// gnb
$('#header .gnb > li').on('mouseenter focusin', function () {
  $(this).addClass('on').siblings().removeClass('on')
  $('#header .dimmed').addClass('on')
})
$('#header .gnb').on('mouseleave focusout', function () {
  $(this).find('> li').removeClass('on');
  $('#header .dimmed').removeClass('on');
})

// 모바일 gnb
$('#header .m-gnb-open').on('click', function () {
  $('#header .m-gnb-area').addClass('on');
  $('#header .dimmed').show();
  $('html').css('overflow', 'hidden');
})
$('#header .m-gnb-close, #header .dimmed').on('click', function () {
  $('#header .m-gnb-area').removeClass('on');
  $('#header .dimmed').hide();
  $('html').css('overflow', '');
  $('#header .m-gnb > li').removeClass('on').find('[class^=m-depth').hide();
})

$('#header .m-gnb > li > a').on('click', function (e) {
  e.preventDefault();
  if (!$(this).next().is(':visible')) {
    $(this).parent().addClass('on').siblings().removeClass('on').find('[class^=m-depth]').slideUp();
    $(this).next().addClass('on').slideDown();
  } else {
    $(this).parent().removeClass('on').find('[class^=m-depth]').slideUp();
    $(this).next().removeClass('on').slideUp();
  }
})

$('#header .m-depth02 > li > a').on('click', function (e) {
  if (!$(this).parent().hasClass('depth03-none')) e.preventDefault();

  if (!$(this).next().is(':visible')) {
    $(this).parent().addClass('on').siblings().removeClass('on').find('[class^=m-depth03], [class^=m-depth04]').slideUp();
    $(this).next().slideDown();
  } else {
    $(this).parent().removeClass('on');
    $(this).next().slideUp();
  }
})

$('#header [class^=m-depth03] > li > a').on('click', function (e) {
  if ($(this).parent().find('.m-depth04').length > 0) e.preventDefault();

  if (!$(this).next().is(':visible')) {
    $(this).next().slideDown();
    $(this).parent().siblings().find('.m-depth04').slideUp();
  } else {
    $(this).next().slideUp();
  }
})

// 분야별 정보
$('#header .list-08 .depth02-item > a').on('mouseenter focus', function () {
  $(this).parent().addClass('on').siblings().removeClass('on');
})

// 메인 슬라이드 불러오기
fetch('./asset/js/mainSlider.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.main-slider .swiper-wrapper');
    data.forEach(slide => {
      const slideEl = document.createElement('div');
      slideEl.className = `swiper-slide`;
      slideEl.innerHTML = `
      <a href="${slide.link}" class="${slide.class}" target="${slide.target}" title="${slide.title}">
        <img src="${slide.image}" alt="${slide.alt}">
      </a>
    `;
      container.appendChild(slideEl);
    });
  })
  .catch(error => console.error('JSON 불러오기 실패:', error));

// 메인 비주얼 슬라이드
setTimeout(() => {
  const mainSlider = new Swiper('.main-slider .swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    simulateTouch: false, // 마우스 드래그 막기
    pagination: {
      el: '.main-slider .swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.main-slider .swiper-button-next',
      prevEl: '.main-slider .swiper-button-prev',
    },
    observer: true,
    observeParents: true,
  });

  // slide stop/play
  setupSliderControls('.main-slider .swiper', mainSlider);
}, 500)


// 핍업 열기
$('.main-slider .button-popup-open').on('click', function () {
  $('.main-popup-slider').addClass('on');
  $('html').css('overflow', 'hidden');
})

fetch('./asset/js/mainSlider.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.main-popup-slider .contents');
    data.forEach(slide => {
      const slideEl = document.createElement('a');
      slideEl.className = `${slide.class}`;
      slideEl.href = `${slide.link}`;
      slideEl.title = `${slide.title}`;
      slideEl.target = `${slide.target}`;
      slideEl.innerHTML = `
        <img src="${slide.image}" alt="${slide.alt}">
      `;
      container.appendChild(slideEl);
    });
  })
  .catch(error => console.error('JSON 불러오기 실패:', error));

// 메인 뉴스 슬라이드
$(".main-news-area .news-tab-list .tab-cont").each(function (i, v) {
  const newsSlider = $(this).find(".swiper");
  const mainNewsSlider = new Swiper(newsSlider[0], {
    loop: true,
    speed: 500,
    slidesPerView: 'auto',
    spaceBetween: 20,
    simulateTouch: false, // 마우스 드래그 막기
    navigation: {
      nextEl: $(this).find('.swiper-button-next')[0],
      prevEl: $(this).find('.swiper-button-prev')[0],
    },
    on: {
      // 초기화 이전에 슬라이드 복제
      beforeInit: slideClone,
    },
    breakpoints: {
      768: {
        spaceBetween: 25,
        slidesPerView: getResponsiveSlidesPerView(), // 여기 수정!
      },
    }
  });
});

// 슬라이드 복제
function slideClone(tg) {
  var swiperWrapper = tg.el.querySelector('.swiper-wrapper');
  var slides = swiperWrapper.querySelectorAll('.swiper-slide');

  // 복제하여 붙여넣기
  for (var i = 0; i < slides.length; i++) {
    var clone = slides[i].cloneNode(true);
    swiperWrapper.appendChild(clone);
  }
}

// 뷰포트에 따라 slidesPerView 계산
function getResponsiveSlidesPerView() {
  const width = $(window).outerWidth();

  if (width >= 1550) return 3;

  if (width > 1400 && width < 1550) {
    const ratio = (width - 1400) / (1550 - 1400); // 0 ~ 1
    return 2.5 + (0.5 * ratio); // 2.5 → 3.0 증가
  }

  if (width > 1200 && width <= 1400) {
    const ratio = (width - 1200) / (1400 - 1200); // 0 ~ 1
    return 2.5 + (0.5 * ratio); // 2.5 → 3.0 증가
  }

  if (width > 767 && width <= 1200) {
    const ratio = (width - 767) / (1200 - 767); // 0 ~ 1
    return 3 + (1.5 * ratio); // 3 → 4.5 증가
  }

}

// 리사이즈 시 업데이트
$(window).on('resize', function () {
  const newSlidesPerView = getResponsiveSlidesPerView();

  if ($(window).outerWidth() > 767) {
    $(".main-news-area .news-tab-list .tab-cont .swiper").each(function () {
      const swiperInstance = this.swiper;
      if (swiperInstance) {
        swiperInstance.params.slidesPerView = newSlidesPerView;
        swiperInstance.update();
      }
    });
  }
});

// 메인 뉴스 탭
$(".main-news-area .list-item").on('click', function () {
  $(this).addClass("is-on").siblings().removeClass("is-on");
})

// 주요 서비스 더보기 버튼
$(".main-service .item-more").on('click', function (e) {
  e.preventDefault();
  if (!$(".main-service .service-list").hasClass('on')) {
    $(".main-service .service-list").addClass('on');
    $(this).addClass('on').find('.service-txt').text('닫기');
  } else {
    $(".main-service .service-list").removeClass('on');
    $(this).removeClass('on').find('.service-txt').text('전체보기');
  }
})

// 알림창
// 슬라이드 불러오기
fetch('./asset/js/notification.json')
.then(response => response.json())
.then(data => {
  const container = document.querySelector('.notification-wrap .swiper-wrapper');
  data.forEach(slide => {
    const slideEl = document.createElement('div');
    slideEl.className = `swiper-slide`;
    slideEl.innerHTML = `
      <a href="${slide.link}" class="${slide.class}" target="${slide.target}" title="${slide.title}">
        <img src="${slide.image}" alt="${slide.alt}">
      </a>
    `;
    container.appendChild(slideEl);
  });
})
.catch(error => console.error('JSON 불러오기 실패:', error));

// 팝업 아이템 불러오기
fetch('./asset/js/notification.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.main-popup-notification .contents');
    data.forEach(slide => {
      const slideEl = document.createElement('a');
      slideEl.className = `${slide.class}`;
      slideEl.href = `${slide.link}`;
      slideEl.title = `${slide.title}`;
      slideEl.target = `${slide.target}`;
      slideEl.innerHTML = `
        <img src="${slide.image}" alt="${slide.alt}">
      `;
      container.appendChild(slideEl);
    });
  })
  .catch(error => console.error('JSON 불러오기 실패:', error));

setTimeout(() => {
  const notificationSlider = new Swiper('.notification-wrap .swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    simulateTouch: false, // 마우스 드래그 막기
    pagination: {
      el: '.notification-wrap .swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.notification-wrap .swiper-button-next',
      prevEl: '.notification-wrap .swiper-button-prev',
    },
    observer: true,
    observeParents: true,
  });
  // slide stop/play
  setupSliderControls('.notification-wrap', notificationSlider);

}, 500);

// 알림창 팝업 오픈
$('.notification-wrap .button-popup-open').on('click', function () {
  $('.main-popup-notification').addClass('on');
  $('html').css('overflow', 'hidden');
})



// 분야별 서비스
function tabActive(target) {
  let dataField = target.data('field');

  target.addClass('active').siblings().removeClass('active');
  $(".main-service-field .field-contents-area [class^=cont-wrap][data-field=" + dataField + "]").addClass('active').siblings().removeClass('active');
}

$(".main-service-field .field-tab-list li").on('click', function () {
  tabActive($(this));

  const tabList = $('.main-service-field .field-tab-list');
  let $target = $(this).position().left;
  let tabListOffsetLeft = $target + tabList.scrollLeft();
  tabList.animate({
    scrollLeft: tabListOffsetLeft - 40
  }, 200); // 스크롤 이동
})

function handleScrollArrowClick(direction) {
  const $tabList = $('.main-service-field .field-tab-list');
  const $current = $tabList.find('li.active');
  let $target;

  if (direction === "prev") {
    $target = $current.prev();
  } else {
    $target = $current.next();
  }

  // 타겟이 존재할 경우
  if ($target.length) {
    const offsetLeft = $target.position().left + $tabList.scrollLeft();

    $tabList.animate({
      scrollLeft: offsetLeft - 40
    }, 200); // 스크롤 이동
    tabActive($target); // 탭 활성화 전환
  }
}

$('.main-service-field .control-wrap [class^=btn-]').on('click', function () {
  let direction = $(this).attr('class').split('-')[1];

  if (direction == "prev") {
    handleScrollArrowClick("prev");
  } else {
    handleScrollArrowClick("next");
  }
})

// 대전시 소통 슬라이드
const commuSlider = new Swiper('.commu-slider .swiper', {
  // loop: true,
  rewind: true,
  slidesPerView: '1.8',
  spaceBetween: 15,
  slidesOffsetAfter: 30,
  simulateTouch: false,
  navigation: {
    nextEl: '.commu-slider .swiper-button-next',
    prevEl: '.commu-slider .swiper-button-prev',
  },
  breakpoints: {
    680: {
      slidesPerView: 2.8,
      spaceBetween: 30,
      slidesOffsetAfter: 50,
    },
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 30,
      slidesOffsetAfter: 30,
    },
    1100: {
      slidesPerView: 2.5,
      spaceBetween: 30,
      slidesOffsetAfter: 30,
    },
    1550: {
      slidesPerView: 3.5,
      spaceBetween: 30,
      slidesOffsetAfter: 50,
    }
  }
});

// 배너 모음 슬라이드
const bannerCollection = new Swiper('.banner-slider .swiper', {
  loop: true,
  speed: 1000,
  slidesPerView: 2,
  spaceBetween: 8,
  simulateTouch: false, // 마우스 드래그 막기
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: '.banner-slider .swiper-button-next',
    prevEl: '.banner-slider .swiper-button-prev',
  },
  breakpoints: {
    500: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    960: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 5.9,
      spaceBetween: 20,
    }
  }
})

$(".banner-slider .button-pause").on('click', function () {
  if (!$(this).hasClass('play')) {
    $(this).addClass('play');
    bannerCollection.autoplay.stop();
  } else {
    $(this).removeClass('play');
    bannerCollection.autoplay.start();
  }
})

// 푸터 dropdown 메뉴 토글
$('#footer .btn-toggle').on('click', function (e) {
  e.preventDefault();
  if (!$(this).parent().hasClass('on')) {
    $(this).parent().addClass('on');
  } else {
    $(this).parent().removeClass('on');
  }
})

// 메인 퀵메뉴
$(window).on('scroll', function () {
  let st = $(this).scrollTop();
  let commuOffset = $('.main-commu').offset().top - $(window).outerHeight() / 1.4;

  if (st >= commuOffset) {
    $('.quick-menu .sns-list').slideUp(200);
  } else {
    $('.quick-menu .sns-list').slideDown(200);
  }
})

$('.quick-menu .quick-btn-search').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $(this.hash).offset().top
  }, 800);
  $('#search').focus();
})

$('.quick-menu .btn-top').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 800);
})
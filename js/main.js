/*
document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => modal.classList.toggle('modal--visible');
  
  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });
  closeBtn.addEventListener('click', switchModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && modal.classList.contains('modal--visible')) {
        switchModal();
    }
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      switchModal();
    }
  });
});
*/
$(document).ready(function () {
  const modal = $('.modal'),
        success = $('.success'),
        modalBtn = $('[data-toggle=modal]'),
        scrollUp = $('.scroll-up__item'),
        scrollDown = $('.hero__scroll-down'),
        successBtn = $('[data-toggle=success]');
  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  $(document).on('keydown', function (e) {
    if ((e.key === 'Escape') && (modal.hasClass('modal--visible')))
       modal.toggleClass('modal--visible')
  });
  $(document).on('click', function (e) {
    if (modal.is(e.target))
      modal.toggleClass('modal--visible');
  });
  successBtn.on('click', function () {
    success.toggleClass('success--visible');
  });
  $(document).on('keydown', function (e) {
    if ((e.key === 'Escape') && (success.hasClass('success--visible')))
       success.toggleClass('success--visible')
  });
  $(document).on('click', function (e) {
    if (success.is(e.target))
      success.toggleClass('success--visible');
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        scrollUp.fadeIn();
    } else {
      scrollUp.fadeOut();
    }
  });
  scrollUp.click(function () {
      $('body,html').animate({
          scrollTop: 0
      }, 1500);
      return false;
  });
  scrollDown.click(function () {
      $('body,html').animate({
          scrollTop: 900
      }, 1500);
      return false;
  });
  const link = $('.nav__link');

  link.on('click', (e) => {
    event.preventDefault();
    let target = $(e.target).attr('href')
    $('body,html').animate({
      scrollTop: $(target).offset().top - 60
      }, 1700);
    return false;
  });

  const swiper1 = new Swiper ('.swiper1', {
    loop: true,
    pagination: {
      el: '.swiper-pagination1',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
  })

  let next = $('.swiper-button-next1');
  let prev = $('.swiper-button-prev1');
  let bullets = $('.swiper-pagination1');

  next.css('left', prev.width() + 20 + bullets.width() + 20)
  bullets.css('left', prev.width() + 20)

  const swiper2 = new Swiper ('.swiper2', {
    pagination: {
      el: '.swiper-pagination2',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
  });

  let next2 = $('.swiper-button-next2');
  let prev2 = $('.swiper-button-prev2');
  let bullets2 = $('.swiper-pagination2');
  const slide = $('.steps-slide')
  const active = $('.steps-slide.swiper-slide-active')
  const counter = $('.swiper-slide-counter')
  next2.css('left', prev2.width() + 20 + bullets2.width() + 20)
  bullets2.css('left', prev2.width() + 20);

  let totalSlides = slide.length;
  let currentSlide = active.index() + 1;
  let down_index;

  counter.html('' + currentSlide + '/' + totalSlides + '');

  next2.on('click', () => {
    let currentSlide_active = $('.steps-slide.swiper-slide-active').index() + 1;
    if (currentSlide_active <= totalSlides) {
      down_index = $('.steps-slide.swiper-slide-active').index() + 1,
      counter.html('' + currentSlide_active + '/' + totalSlides + '');
      $('.section__slide-heading-box').each(function(e) {
        if (e === currentSlide_active - 1) {
          $(this).addClass('box--active')
        } else {
          $(this).removeClass('box--active')
        }
     })
    };
  });
  prev2.on('click', () => {
    down_index = down_index - 1;
    if (down_index >= 1) {
      counter.html('' + down_index + '/' + totalSlides + '');
    $('.section__slide-heading-box').each(function(e) {
      if (e === down_index - 1) {
        $(this).addClass('box--active')
      } else {
        $(this).removeClass('box--active')
      }
     })
    };
  });
  $('.section__slide-heading-box').each(function(e) {
    if (e === 0) {
      $(this).addClass('box--active');
    }
  });

  const box = $('.section__slide-heading-box');

  box.on('click', (e) => {
    let id = e.currentTarget.id;
    swiper2[0].slideTo(id - 1)
    swiper2[1].slideTo(id - 1)
    counter.html('' + id + '/' + totalSlides + '');
    box.each(function(e) {
      if (e == id - 1) {
        $(this).addClass('box--active')
      } else {
        $(this).removeClass('box--active')
      }
    })
  });

  new WOW().init();
  const modalForm = $('.modal__form'),
        controlForm = $('.control__form'),
        footerForm = $('.footer__form'),
        processForm = $('.process__form');

  modalForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      userEmail: {
        required: true,
        email: true
      },
      policyCheckbox: "required"
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее пятнадцати букв"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      },
      policyCheckbox: "Заполните поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          success.toggleClass('success--visible');
        }
      });
    }
  });
  processForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      userEmail: {
        required: true,
        email: true
      },
      policyCheckbox: "required"
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее пятнадцати букв"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      },
      policyCheckbox: "Заполните поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          success.toggleClass('success--visible');
        }
      });
    }
  });

  controlForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      controlPolicyCheckbox: "required"
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее пятнадцати букв"
      },
      userPhone: "Заполните поле",
      controlPolicyCheckbox: "Заполните поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          success.toggleClass('success--visible');
        }
      });
    }
  });

  footerForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      userQuestion: {
        required:true,
        minlength: 10
      },
      footerPolicyCheckbox: "required"
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее пятнадцати букв"
      },
      userPhone: "Заполните поле",
      userQuestion: {
        required: "Напишите ваш вопрос",
        minlength: "В вопросе должно быть не менее 10 символов"
      },
      footerPolicyCheckbox: "Заполните поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          success.toggleClass('success--visible');
        }
      });
    }
  });

  $('[type=tel]').mask('+7 (000) 000 00-00', {placeholder: "Ваш номер телефона:"});

  let spinner = $('.ymap-container').children('.loader');

  let check_if_load = false;

  function init () {
    let myMap = new ymaps.Map('map-yandex', {
        center: [47.208901, 39.631539],
        zoom: 15
    }, {
        searchControlProvider: 'yandex#search'
    }),
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Наш офис',
        balloonContent: 'Вход со двора'
    }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.png',
        iconImageSize: [32, 32],
        iconImageOffset: [-5, -38],
    });
    myMap.geoObjects.add(myPlacemark);
    let layer = myMapTemp.layers.get(0).get(0);

    waitForTilesLoad(layer).then(function() {
      spinner.removeClass('is-active');
    });
  }
  
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      let tc = getTileContainer(layer), readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function() {
          resolve();
        });
      }
    });
  }
  
  function getTileContainer(layer) {
    for (let k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
          || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }
  
  function loadScript(url, callback) {
    let script = document.createElement("script");
      script.onload = function() {
        callback();
      };
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  let ymap = function() {
    $('.ymap-container').mouseenter(function() {
        if (!check_if_load) { 
          check_if_load = true; 
          spinner.addClass('is-active');
          loadScript("https://api-maps.yandex.ru/2.1/?apikey=a00f0ba8-875e-472d-9d6e-105c41b610b1&lang=ru_RU", function() {
            ymaps.load(init);
          });                
        }
      }
    );  
  }
  
  $(function() {
    ymap();
  });

  const swiper3 = new Swiper ('.swiper3', {
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
  });

  const list = $('.section__style-list');
  const el = $('.section__style-item');

  list.on('click', (e) => {
    let target = e.target;
    let i = $(el).index(target);
    swiper3.slideTo(i);
    $(el).each(i => $(el).removeClass('item-active'))
    $(target).addClass('item-active');
  });

  const swiper4 = new Swiper ('.swiper4', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
  });
  
  $('.control__video').one('mouseenter', () => {
    $( "<script src=\"https://www.youtube.com/iframe_api\"></script>" ).appendTo( ".control__video" );
  });

  var player;
  
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: 'zh-bQ6W7WU8',
          events: {
              'onReady': videoPlay,
            }
          });
        })
        
  function videoPlay(event) {
    event.target.playVideo();
  }

});
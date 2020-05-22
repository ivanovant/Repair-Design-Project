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
      }, 1200);
      return false;
  });

  var swiper1 = new Swiper ('.swiper1', {
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

  var swiper2 = new Swiper ('.swiper2', {
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

  $('.section__slide-heading-box').on('click', (e) => {
    const id = e.target.id - 1
    swiper2[0].slideTo(id)
    swiper2[1].slideTo(id)
    counter.html('' + (id + 1) + '/' + totalSlides + '');
    $('.section__slide-heading-box').each(function(e) {
      if (e === id) {
        $(this).addClass('box--active')
      } else {
        $(this).removeClass('box--active')
      }
     })
  });

  new WOW().init();
  const modalForm = $('.modal__form'),
        controlForm = $('.control__form'),
        footerForm = $('.footer__form');

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

  $('[type=tel]').mask('+7 (000) 000 00-00', {placeholder: "+7 (___) ___-__-__"});

  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [47.208901, 39.631539],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Наш офис',
            balloonContent: 'Вход со двора'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/location.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        })

    myMap.geoObjects
        .add(myPlacemark)
  });
  VK.Widgets.Group("vk__modal", {
    width: 320,
    color1: "181818",
    mode: 3
    },
  123083697);
});
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
        modalBtn = $('[data-toggle=modal]'),
        closeBtn = $('.modal__close'),
        scrollUp = $('.scroll-up__item');
  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible')
  });
  $(document).on('keydown', function (e) {
    if ((e.key === 'Escape') && (modal.hasClass('modal--visible')))
       modal.toggleClass('modal--visible')
  });
  $(document).on('click', function (e) {
    if (modal.is(e.target))
      modal.toggleClass('modal--visible');
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

  $(".modal__form").validate({
    rules: {
      // simple rule, converted to {required:true}
      userName: "required",
      // compound rule
      userEmail: {
        required: true,
        email: true
      }
    }
  });
  
});
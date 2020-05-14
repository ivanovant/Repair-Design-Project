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
        closeBtn = $('.modal__close');
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
});
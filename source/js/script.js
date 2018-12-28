var mainNavToggle = document.querySelector('.main-nav__toggle');
var header = document.querySelector('.header');
var mainNav = document.querySelector('.main-nav');
var mainNavList = document.querySelector('.main-nav__list');

header.classList.remove('header--nojs');
mainNavToggle.classList.remove('main-nav__toggle--nojs');
mainNavList.classList.add('main-nav__list--closed');
mainNav.style.backgroundColor = 'transparent';

mainNavToggle.addEventListener('click', function () {
  if (mainNavToggle.classList.contains('main-nav__toggle--closed')) {
    mainNavToggle.classList.remove('main-nav__toggle--closed');
    mainNavList.classList.remove('main-nav__list--closed');
    mainNavToggle.classList.add('main-nav__toggle--opened');
    mainNav.style.backgroundColor = '#293646';
    header.style.position = 'relative';
  } else {
    mainNavToggle.classList.remove('main-nav__toggle--opened');
    mainNavToggle.classList.add('main-nav__toggle--closed');
    mainNavList.classList.add('main-nav__list--closed');
    mainNav.style.backgroundColor = 'transparent';
    header.style.position = 'absolute';
  }
});

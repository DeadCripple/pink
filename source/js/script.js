var mainNavToggle = document.querySelector('.main-nav__toggle');
var header = document.querySelector('.header');
var mainNav = document.querySelector('.main-nav');
var mainNavList = document.querySelector('.main-nav__list');
var headBlock = document.querySelector('.head-block');

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
    headBlock.style.paddingTop = '25px';
  } else {
    mainNavToggle.classList.remove('main-nav__toggle--opened');
    mainNavToggle.classList.add('main-nav__toggle--closed');
    mainNavList.classList.add('main-nav__list--closed');
    mainNav.style.backgroundColor = 'transparent';
    header.style.position = 'absolute';
    headBlock.style.paddingTop = '125px';
  }
});

headBlock.style.paddingTop = '125px';


function initMap() {
  var uluru = {
    lat: 59.936474,
    lng: 30.321221
  };
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 18,
      center: uluru,
      disableDefaultUI: true,
      zoomControl: true
    });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 13,
      fillOpacity: 100,
      fillColor: '#d22856',
      strokeWeight: 10,
      strokeColor: 'white'
    }
  });
}

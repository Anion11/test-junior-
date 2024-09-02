import '../styles/style.scss';
import 'virtual:svg-icons-register';
import 'lazysizes';
import { select } from '../blocks/select/select';
import { swiperInit } from './swiper';
import { mapInit } from './map';

document.addEventListener('DOMContentLoaded', function () {
  // select();
  // input();
  swiperInit();
  mapInit();
});

import Swiper from 'swiper/bundle';

import $ from 'jquery';

const BREAKPOINT = 1280;

export function swiperInit() {
  const slider = $('[data-slider-id]');

  if (slider.length) {
    slider.each(function () {
      const slider_el = $(this);
      const slider_id = slider_el.data('slider-id');
      const slider_prev_id = slider_el.data('slider-prev');
      const slider_next_id = slider_el.data('slider-next');
      const slider_tabs_id = slider_el.data('slider-tabs');
      const slider_prev = $(`[data-slider-button="${slider_prev_id}"]`);
      const slider_next = $(`[data-slider-button="${slider_next_id}"]`);
      const slider_buttons = $('[data-slider-buttons]');
      const swiperTabs = $(`[data-swiper-tabs="${slider_tabs_id}"] [data-swiper-tab]`);
      let pagination;
      let loop;

      if (slider_el.attr('data-pag-id')) {
        const id = slider_el.data('pag-id');
        pagination = document.querySelector(`[data-pag-wrapper="${id}"]`);
      }
      if (slider_el.attr('data-swiper-loop')) {
        loop = true;
      }

      if (slider_buttons.length) {
        const slides_count = slider_el.find('.swiper-slide').length;
        const min_count = slider_buttons.data('slider-buttons');

        if (slides_count < +min_count) {
          slider_buttons.addClass('hidden');
        }
      }

      let slider_options = {
        slidesPerView: 'auto',

        spaceBetween: 10,
        speed: 1000,
        loop: loop,
        pagination: {
          el: pagination,
          clickable: true,
        },

        breakpoints: {
          [BREAKPOINT]: {
            spaceBetween: 20,
          },
        },
      };

      switch (slider_id) {
        case 'history-years':
          slider_options = {
            ...slider_options,
            spaceBetween: 0,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            breakpoints: {
              [1200]: {
                spaceBetween: 0,
              },
            },
          };
          break;
        case 'history-images':
          slider_options = {
            ...slider_options,
            spaceBetween: 0,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            breakpoints: {
              [1200]: {
                spaceBetween: 0,
              },
            },
          };
          break;
        case 'history-texts':
          slider_options = {
            ...slider_options,
            spaceBetween: 0,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            breakpoints: {
              [1200]: {
                spaceBetween: 20,
              },
            },
            on: {
              init: function () {
                const block = document.querySelector('[data-history-texts]');
                const slides = block.querySelectorAll('.swiper-slide');
                let height = 0;
                setTimeout(() => {
                  slides.forEach((el) => {
                    if (el.classList.contains('swiper-slide-active'))
                      height = `${el.offsetHeight}px`;
                  });
                  block.style.height = height;
                }, 0);
              },
              slideChange: function () {
                const block = document.querySelector('[data-history-texts]');
                const slides = block.querySelectorAll('.swiper-slide');
                let height = 0;
                setTimeout(() => {
                  slides.forEach((el) => {
                    if (el.classList.contains('swiper-slide-active'))
                      height = `${el.offsetHeight}px`;
                  });
                  block.style.height = height;
                }, 0);
              },
            },
          };
          break;
      }

      const slider_swiper = new Swiper(slider_el[0], slider_options);

      if (swiperTabs && slider_swiper.slides.length === swiperTabs.length) {
        swiperTabs.each((index, element) => {
          element.addEventListener('click', () => {
            if (slider_swiper.params.loop) slider_swiper.slideToLoop(index);
            else slider_swiper.slideTo(index);
          });
        });

        slider_swiper.on('slideChange', () => {
          swiperTabs.each((index, element) => {
            element.classList.remove('active');
          });
          swiperTabs[slider_swiper.realIndex].classList.add('active');
        });
      }

      slider_prev.on('click', () => {
        slider_swiper.slidePrev();
      });
      slider_next.on('click', () => {
        slider_swiper.slideNext();
      });
    });
  }
}

// swiper
{
  $(window).on('load', () => {
    swiperInit();
  });
}

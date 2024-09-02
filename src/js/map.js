import $ from 'jquery';

export const mapInit = () => {
  ymaps.ready(() => {
    const placemarks = $('.mark');
    const marksList = $('.marks-list');

    const map = new ymaps.Map('map', {
      center:
        placemarks.length > 0
          ? placemarks[0].dataset.cord.split(' ').map(Number)
          : [55.69289651935801, 37.734255932588425],
      zoom: 9,
    });

    placemarks.each((index, el) => {
      const coord = el.dataset.cord.split(' ').map(Number);
      const placemarName = el.dataset.mark;
      const placemark = new ymaps.Placemark(coord, {
        balloonContent: el.innerHTML,
      });
      placemark.type = 'point';

      placemark.events.add(['balloonopen'], (event) => {
        placemarks.each((index, item) => {
          item.classList.remove('active');
        });
        el.classList.add('active');

        const targetOffset = $(el).offset().top;
        const containerOffset = $(marksList[0]).offset().top;
        const scrollTo = targetOffset - containerOffset + $(marksList[0]).scrollTop();
        $([marksList[0]]).animate(
          {
            scrollTop: scrollTo,
          },
          {
            duration: 500,
            easing: 'linear',
          }
        );
      });

      placemark.events.add(['balloonclose'], (event) => {
        placemarks.each((index, item) => {
          item.classList.remove('active');
        });
      });

      el.addEventListener('click', () => {
        if (!el.classList.contains('active')) placemark.balloon.open();
        else placemark.balloon.close();
      });

      map.geoObjects.add(placemark);
    });
  });
};

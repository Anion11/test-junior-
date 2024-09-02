import $ from 'jquery';

export const input = () => {
  const inputsContainers = $('[data-input-parent]');

  if (inputsContainers.length > 0) {
    inputsContainers.each(function () {
      const container = $(this);
      const input = container.find('[data-input]');
      const reset = container.find('.input-wrapper-svg');

      if (!input.length) return;

      input.on('input', function () {
        if (input.val().trim() !== '') {
          container.addClass('filled');
        } else {
          container.removeClass('filled');
        }
      });

      if (reset.length) {
        reset.on('click', function () {
          input.val('');
          input.trigger('input');
          container.removeClass('filled');
        });
      }
    });
  }
};

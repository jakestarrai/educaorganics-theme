import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide, EventInterface } from '@splidejs/splide';

function ScrollBarExtension(SplideInstance, Components) {
  const { on } = EventInterface(SplideInstance);

  function updateProgressBar() {
    const bar = SplideInstance.root.parentNode.querySelector('.splide__progress-bar');
    const end = Components.Controller.getEnd() + 1;
    const rate = Math.min((SplideInstance.index + 1) / end, 1);

    bar.style.width = `${String(100 * rate)}%`;
  }

  function mount() {
    on('mounted move', updateProgressBar);
  }

  return {
    mount,
  };
}

register('testimonials', {
  _slideToBlock(index) {
    this.splide.go(index);
  },

  initTestimonialsSlider() {
    const { container } = this;

    const splide = new Splide(container.querySelector('.testimonials-slider'), {
      mediaQuery: 'min',
      type: 'loop',
      speed: 800,
      perPage: 1,
      start: 1,
      padding: {
        left: '4.313rem',
        right: '4.313rem',
      },
      gap: 16,
      focus: 'center',
      pagination: false,
      arrows: false,
      keyboard: 'focused',
      breakpoints: {
        567: {
          perPage: 2,
          gap: 32,
        },
        920: {
          perPage: 3,
        },
        1200: {
          destroy: true,
        },
      },
    });

    splide.mount({
      ScrollBarExtension,
    });
  },

  onLoad() {
    performanceMeasure(this.id, this.initTestimonialsSlider.bind(this));
  },

  onUnload() {
    this.splide.destroy();
  },

  onDeselect() {
    this.splide.go(1);
  },

  onBlockSelect(e) {
    this._slideToBlock(+e.target.dataset.index);
  },

  onBlockDeselect() {
    this.splide.go(1);
  },
});

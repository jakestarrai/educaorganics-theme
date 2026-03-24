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

register('our-process', {
  _slideToBlock(index) {
    this.splide.go(index);
  },

  initProcessSlider() {
    const { container } = this;

    const splide = new Splide(container.querySelector('.our-process-slider'), {
      type: 'slide',
      speed: 800,
      perPage: 3,
      gap: 24,
      padding: {
        right: '14.499rem',
      },
      pagination: false,
      arrows: false,
      keyboard: 'focused',
      breakpoints: {
        1380: {
          padding: {
            right: '11rem',
          },
        },
        1300: {
          perPage: 2,
          padding: {
            right: '10rem',
          },
        },
        1023: {
          padding: {
            right: '5rem',
          },
        },
        767: {
          destroy: true,
        },
      },
    });

    splide.mount({
      ScrollBarExtension,
    });
  },

  onLoad() {
    performanceMeasure(this.id, this.initProcessSlider.bind(this));
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

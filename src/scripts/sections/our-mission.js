import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Intersection } from '@splidejs/splide-extension-intersection';
import debounce from 'debounce';

register('our-mission', {
  initImageCarousel() {
    const { container } = this;

    const splide = new Splide(container.querySelector('.image-carousel'), {
      type: 'loop',
      padding: {
        left: '5rem',
        right: '5rem',
      },
      autoWidth: true,
      autoHeight: true,
      gap: 40,
      drag: false,
      focus: 'center',
      pagination: false,
      arrows: false,
      keyboard: 'focused',
      autoScroll: {
        autoStart: false,
        speed: 2,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
      intersection: {
        rootMargin: '150px',
        inView: {
          autoplay: true,
          autoScroll: true,
        },
        outView: {
          autoplay: false,
          autoScroll: false,
        },
      },
      breakpoints: {
        920: {
          gap: 32,
          padding: {
            left: '5.5rem',
            right: '5.5rem',
          },
          autoScroll: {
            speed: 1,
          },
        },
        540: {
          gap: 16,
        },
      },
    });

    window.addEventListener(
      'resize',
      debounce(() => {
        splide.refresh();
      }, 300)
    );

    window.addEventListener(
      'orientationchange',
      debounce(() => {
        splide.refresh();
      }, 300)
    );

    splide.mount({ AutoScroll, Intersection });
  },

  onLoad() {
    performanceMeasure(this.id, this.initImageCarousel.bind(this));
  },
});

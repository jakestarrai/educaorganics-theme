import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Intersection } from '@splidejs/splide-extension-intersection';
import debounce from 'debounce';

register('community-section', {
  initCommunityCarousel() {
    const { container } = this;

    const splide = new Splide(container.querySelector('.community-carousel'), {
      mediaQuery: 'min',
      type: 'loop',
      padding: {
        left: '5.93rem',
        right: '5.93rem',
      },
      perPage: 1,
      gap: 16,
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
        540: {
          perPage: 2,
        },
        768: {
          perPage: 3,
        },
        1200: {
          perPage: 4,
          gap: 32,
          padding: {
            left: '4.5rem',
            right: '4.5rem',
          },
        },
        1800: {
          perPage: 5,
        },
        2000: {
          perPage: 6,
        },
        2400: {
          perPage: 7,
        },
        2800: {
          perPage: 8,
        },
        3200: {
          perPage: 9,
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
    performanceMeasure(this.id, this.initCommunityCarousel.bind(this));
  },

  onUnload() {
    this.splide.destroy();
  },

  onDeselect() {
    this.splide.go(1);
  },
});

import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide } from '@splidejs/splide';

register('image-carousel', {
  _slideToBlock(index) {
    this.splide.go(index);
  },

  initImageCarousel() {
    const { container } = this;
    const gallery_layout_1 = document.querySelector('[data-layout^="gallery_layout_1"]');

    const splide = new Splide(container.querySelector('.image-carousel'), {
      mediaQuery: 'min',
      type: 'loop',
      autoHeight: true,
      speed: 800,
      gap: 0,
      rewindSpeed: 800,
      updateOnMove: true,
      pagination: false,
      arrows: false,
      drag: true,
      keyboard: 'focused',
      breakpoints: {
        1280: {
          arrows: true,
        },
      },
    });

    // If section_layout_1 thumbnails gallery
    const thumbnails = new Splide(container.querySelector('.image-carousel-thumbnails'), {
      mediaQuery: 'min',
      type: 'loop',
      speed: 800,
      gap: '1rem',
      fixedWidth: '12.5rem',
      fixedHeight: '12.5rem',
      focus: 'center',
      padding: {
        left: '5rem',
        right: '5rem',
      },
      updateOnMove: true,
      trimSpace: false,
      pagination: false,
      isNavigation: true,
      arrows: false,
      drag: true,
      snap: true,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      keyboard: 'focused',
      breakpoints: {
        1024: {
          fixedWidth: '23rem',
          fixedHeight: '23rem',
          gap: '1.5rem',
          padding: {
            left: '0',
            right: '0',
          },
        },
        1400: {
          gap: '2.5rem',
        },
        1600: {
          gap: '1.5rem',
        },
      },
    });

    // If section_layout_2 thumbnails gallery
    const thumbnailsSecondary = new Splide(container.querySelector('.image-carousel-thumbnails'), {
      mediaQuery: 'min',
      type: 'loop',
      speed: 800,
      gap: 0,
      height: '13.25rem',
      focus: 'center',
      updateOnMove: true,
      trimSpace: false,
      pagination: false,
      isNavigation: true,
      arrows: true,
      drag: true,
      snap: true,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      keyboard: 'focused',
      breakpoints: {
        768: {
          fixedWidth: '13.25rem',
          fixedHeight: '13.25rem',
          gap: '1.5rem',
          arrows: false,
        },
        1024: {
          fixedWidth: '23rem',
          fixedHeight: '23rem',
        },
        1400: {
          gap: '2.5rem',
        },
        1600: {
          gap: '1.5rem',
        },
      },
    });

    // If section_layout_1 thumbnails gallery
    if (gallery_layout_1) {
      splide.sync(thumbnails);
      splide.mount();
      thumbnails.mount();
    } else {
      // If section_layout_2 thumbnails gallery
      splide.sync(thumbnailsSecondary);
      splide.mount();
      thumbnailsSecondary.mount();
    }
  },

  onLoad() {
    performanceMeasure(this.id, this.initImageCarousel.bind(this));
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

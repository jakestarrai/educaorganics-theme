import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide } from '@splidejs/splide';
import { Product } from '../models/product';

register('product', {
  _initProduct(handle) {
    if (handle) window.Product = new Product(this.container);

    this._initSlider();
  },

  _initSlider() {
    const { container } = this;
    const mainSlider = container.querySelector('.product-slider');
    const mainSlides = mainSlider.querySelectorAll('[data-product-slider]');
    const numSlides = mainSlides.length;
    const thumbnailHeight = numSlides < 5 ? (88 + 24) * numSlides : 538;

    const splide = new Splide(container.querySelector('.product-slider'), {
      mediaQuery: 'min',
      type: 'loop',
      updateOnMove: true,
      speed: 800,
      perPage: 1,
      gap: 16,
      padding: {
        left: '3.75rem',
        right: '3.75rem',
      },
      rewind: true,
      rewindSpeed: 800,
      center: true,
      pagination: true,
      arrows: false,
      drag: true,
      keyboard: true,
      breakpoints: {
        768: {
          perPage: 2,
          padding: {
            left: '5rem',
            right: '5rem',
          },
          gap: 32,
        },
        1024: {
          perPage: 1,
          padding: 0,
          gap: 0,
          center: false,
          pagination: false,
        },
      },
    });

    const thumbnails = new Splide(container.querySelector('.product-slider-thumbnails'), {
      mediaQuery: 'min',
      direction: 'ttb',
      updateOnMove: true,
      speed: 800,
      height: `${thumbnailHeight}px`,
      fixedWidth: 64,
      fixedHeight: 88,
      gap: 24,
      rewind: true,
      rewindSpeed: 800,
      pagination: false,
      arrows: false,
      drag: true,
      isNavigation: true,
      keyboard: true,
    });

    splide.on('moved', (newIndex) => {
      const selectedSlide = mainSlides[newIndex];
      const videoElement = selectedSlide.querySelector('video');

      if (videoElement) {
        const videoSource = videoElement.getAttribute('data-video-src');

        videoElement.src = videoSource;
        videoElement.load();
      } else {
        const videos = mainSlider.querySelectorAll('video');

        videos.forEach((video) => {
          video.pause();
        });
      }
    });
    splide.sync(thumbnails);
    splide.mount();
    thumbnails.mount();
  },

  onLoad() {
    performanceMeasure(this.id, this._initProduct.bind(this, this.container.dataset.handle));
  },

  onBlockSelect() {
    this._initProduct(this.container.dataset.handle);
  },
});

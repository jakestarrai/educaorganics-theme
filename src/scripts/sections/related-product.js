import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { Splide } from '@splidejs/splide';

class RelatedProducts {
  constructor(elem, sectionId) {
    this.wrapper = elem;
    this.limit = this.wrapper.getAttribute('data-limit');

    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;

      observer.unobserve(this.wrapper);
    };

    new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 200px 0px' }).observe(this.wrapper);
  }

  async initRelatedProducts() {
    const url = this.wrapper.getAttribute('data-url');
    const response = await fetch(url);
    const text = await response.text();

    return text;
  }

  async init(sectionId) {
    return performanceMeasure(
      sectionId,
      async () => {
        const relatedProductsData = await this.initRelatedProducts();

        const container = new DOMParser()
          .parseFromString(relatedProductsData, 'text/html')
          .querySelector('section[data-recomendations]');

        if (container !== null) {
          this.wrapper.appendChild(container);
        } else {
          this.wrapper.classList.toggle('hidden');
        }
      },
      true
    );
  }
}

register('product-recommendations', {
  _slideToBlock(index) {
    this.splide.go(index);
  },

  initSlider() {
    const { container } = this;

    const splide = new Splide(container.querySelector('.product-recommendations-gallery'), {
      mediaQuery: 'min',
      type: 'slide',
      snap: false,
      speed: 800,
      autoplay: false,
      padding: { right: '8rem' },
      perPage: 1,
      gap: 16,
      pagination: false,
      arrows: false,
      drag: true,
      keyboard: 'focused',
      breakpoints: {
        768: {
          perPage: 2,
          padding: { right: '10rem' },
          gap: 32,
        },
        1024: {
          perPage: 3,
          padding: { right: '12.5rem' },
          gap: 40,
        },
      },
    });

    const bar = container.querySelector('.splide__progress-bar');

    // Updates the bar width whenever the carousel moves:
    splide.on('mounted move', function () {
      const end = splide.Components.Controller.getEnd() + 1;
      const rate = Math.min((splide.index + 1) / end, 1);

      bar.style.width = `${String(100 * rate)}%`;
    });

    splide.mount();
  },
  onLoad() {
    const relatedProductSection = new RelatedProducts(this.container, this.id);

    relatedProductSection.init(this.id).then(() => {
      performanceMeasure(this.id, this.initSlider.bind(this));
    });
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

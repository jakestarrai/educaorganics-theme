import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import Parallax from 'parallax-js';

register('hero-parallax', {
  initParallaxOnHero() {
    const parallaxHeroElement = document.querySelectorAll('.parallax-section');

    if (!parallaxHeroElement.length) return;

    parallaxHeroElement.forEach((element) => {
      const parallaxInstance = new Parallax(element, {
        relativeInput: true,
        hoverOnly: true,
        selector: '.parallax-element',
      });
    });
  },

  onLoad() {
    performanceMeasure(this.id, this.initParallaxOnHero.bind(this));
  },
});

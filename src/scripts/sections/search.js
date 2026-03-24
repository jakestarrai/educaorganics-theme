import { register } from '@shopify/theme-sections';
import { performanceMeasure } from 'helpers/utils';
import { RenderProduct } from 'helpers/renderProductCard';

register('search', {
  _initProduct() {
    const productCard = new RenderProduct(this.container);

    productCard.onLoad();
  },
  onLoad() {
    performanceMeasure(this.id, this._initProduct.bind(this));
  },
});

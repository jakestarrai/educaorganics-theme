import { h, FunctionComponent, Fragment } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

import { ProductType } from 'types';
import { ProductContext } from 'contexts/productContext';
import { SwatcherProductsContext } from 'contexts/swatcherProductsContext';

import ProductForm from './ProductForm';
import ProductAccordion from './ProductAccordion';

interface Props {
  product: ProductType;
  swatcherProducts?: ProductType[] | null;
}

const ProductMainBlock: FunctionComponent<Props> = ({ product }) => {
  const { settings, chosenProduct } = useContext(ProductContext);
  const { swatchTypes } = useContext(SwatcherProductsContext);

  const returnProduct = useMemo(() => {
    if (settings?.swatcher_type === swatchTypes.variants) {
      return product;
    }

    return chosenProduct;
  }, [settings, product, chosenProduct]);

  return (
    <div className="md:sticky md:top-[var(--header-sticky-height)]">
      <div className="product__vendor">by {returnProduct?.vendor}</div>
      <h1 className="mb-1 font-heading text-h5 md:mb-2">{returnProduct?.title}</h1>
      {returnProduct && (
        <Fragment>
          <ProductForm product={returnProduct} />
          <ProductAccordion product={returnProduct} />
        </Fragment>
      )}
    </div>
  );
};

export default ProductMainBlock;

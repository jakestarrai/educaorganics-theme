import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { formatMoney } from '@shopify/theme-currency/currency';
import { addItem } from 'store/features/cart/cartSlice';

import { CartItem } from 'types';
import theme from 'helpers/themeSettings';

import { useDispatch } from 'react-redux';
import { Loader } from 'components/Loader';
import { Image } from 'components/Image';

interface PropsType {
  item?: CartItem;
}

const ProductCard = ({ product }) => {
  const { url, first_available_variant, vendor, title } = product;
  const dispatch = useDispatch();
  const [productAdding, setProductAdding] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleATC = () => {
    setProductAdding(true);

    try {
      dispatch(
        addItem({
          id: first_available_variant.id,
          quantity: {
            quantity: 1,
          },
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setButtonClicked(true);
    }
  };

  const renderImage = ({ media, productUrl, productTitle }) =>
    media[0].src && (
      <div className="mr-5 w-16 shrink-0">
        <a
          href={productUrl}
          className="block"
          aria-label={productTitle}
        >
          <Image
            src={media[0].src}
            sizes={['64x82', '90x112', '90x112']}
            ratio={media.aspect_ratio}
            alt={media.alt}
            fetchpriority="low"
          />
        </a>
      </div>
    );

  const renderUnitPrice = ({ unit_price, reference_value, reference_unit }) => {
    if (unit_price) {
      const unitPrice = formatMoney(unit_price, theme.moneyFormat);

      const referenceUnit = reference_value !== 1 ? `${reference_value} ${reference_unit}` : reference_unit;

      return (
        <div className="text-product-price-small lg:text-product-price-small-desktop">
          {unitPrice} / {referenceUnit}
        </div>
      );
    }
  };

  const renderPrice = ({ compare_at_price, price }) => {
    if (compare_at_price !== price && compare_at_price !== null) {
      return (
        <Fragment>
          <del
            className="text-base-sale-price"
            dangerouslySetInnerHTML={{ __html: formatMoney(price, theme.moneyFormat) }}
          />
          <ins
            className="no-underline"
            dangerouslySetInnerHTML={{ __html: formatMoney(compare_at_price, theme.moneyFormat) }}
          />
        </Fragment>
      );
    }

    return <div dangerouslySetInnerHTML={{ __html: formatMoney(price, theme.moneyFormat) }} />;
  };

  return buttonClicked ? (
    <li
      className="
        flex
        snap-start
        snap-always
        items-center
        justify-center
        border-r
        border-base-border
        px-4
        last:border-none
        lg:block
        xl:border-0
        "
    >
      <Loader />
    </li>
  ) : (
    <li
      className="
        flex
        snap-start
        snap-always
        border-r
        border-base-border
        px-4
        last:border-none
        lg:flex-col
        xl:border-0
        "
    >
      <div className="flex w-full border-b border-base-border py-3">
        {renderImage(product)}

        <div className="flex w-full flex-col justify-between lg:block">
          <div>
            {theme.cart.showVendor && <div className="text-body-small">{vendor}</div>}
            <div className="mb-2 flex justify-between">
              <div>
                <div className="mb-2 text-title last:mb-0 lg:text-title-desktop">
                  <a
                    href={url}
                    className="inline-block align-top no-underline hover:opacity-90"
                  >
                    {title}
                  </a>
                </div>
                {product.unit_price_measurement && (
                  <div className="mb-2 last:mb-0">{renderUnitPrice(product.unit_price_measurement)}</div>
                )}
              </div>
              <div className="-mt-[2px] ml-1 max-w-[40%] shrink-0 text-right text-product-price-large text-base-secondary lg:text-product-price-large-desktop [&>*]:block">
                {renderPrice(product)}
              </div>
            </div>
          </div>
          <div>
            {!productAdding ? (
              <button
                type="button"
                onClick={handleATC}
              >
                <span className="text-body-small">{`+ ${theme.cart.addToCart}`}</span>
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;

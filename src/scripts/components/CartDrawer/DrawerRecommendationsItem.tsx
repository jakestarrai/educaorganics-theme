import { h, Fragment, FunctionComponent } from 'preact';
import { useRef } from 'preact/hooks';
import { formatMoney } from '@shopify/theme-currency/currency';
import { getId } from 'helpers/utils';

import { CartItem } from 'types';
import theme from 'helpers/themeSettings';

import { useHandleQuantity } from 'hooks/useHandleQuantity';
import { Image } from '../Image';
import { DrawerLineItemDiscount } from './DrawerLineItemDiscount';

interface PropsType {
  item?: CartItem;
}

const RecommendationsItem: FunctionComponent<PropsType> = ({ item }) => {
  const mobileQuantityInputRef = useRef<HTMLInputElement>();

  const renderImage = ({ featured_image, url, product_title }) =>
    featured_image.url && (
      <div className="mr-5 w-16 shrink-0">
        <a
          href={url}
          className="block"
          aria-label={product_title}
        >
          <Image
            src={featured_image.url}
            sizes={['64x82', '90x112', '90x112']}
            ratio={featured_image.aspect_ratio}
            alt={featured_image.alt}
          />
        </a>
      </div>
    );

  const renderProperties = (properties) => {
    if (!properties) return false;

    const keys = Object.keys(properties);

    return keys.map(
      (key) =>
        properties.hasOwnProperty(key) && (
          <div
            key={getId()}
            className="text-body-small"
          >
            <span className="mr-1 inline-block text-base-secondary">{key}:</span>
            {properties[key]}
          </div>
        )
    );
  };

  const renderPrice = ({ original_price, price, final_price }) => {
    if (original_price !== final_price) {
      return (
        <div className="text-product-price-small lg:text-product-price-small-desktop">
          <del
            className="text-base-sale-price"
            dangerouslySetInnerHTML={{ __html: formatMoney(original_price, theme.moneyFormat) }}
          />
          <ins
            className="no-underline"
            dangerouslySetInnerHTML={{ __html: formatMoney(final_price, theme.moneyFormat) }}
          />
        </div>
      );
    }

    return (
      <div className="text-product-price-small lg:text-product-price-small-desktop">
        <div dangerouslySetInnerHTML={{ __html: formatMoney(price, theme.moneyFormat) }} />
      </div>
    );
  };

  const renderTotalPrice = ({ final_line_price, original_line_price }) => {
    const finalPrice = (
      <ins
        className="no-underline"
        dangerouslySetInnerHTML={{ __html: formatMoney(final_line_price, theme.moneyFormat) }}
      />
    );

    if (original_line_price !== final_line_price) {
      return (
        <Fragment>
          <del
            className="text-base-sale-price"
            dangerouslySetInnerHTML={{ __html: formatMoney(original_line_price, theme.moneyFormat) }}
          />
          {finalPrice}
        </Fragment>
      );
    }

    return <div dangerouslySetInnerHTML={{ __html: formatMoney(final_line_price, theme.moneyFormat) }} />;
  };

  const renderUnitPrice = ({ unit_price, unit_price_measurement }: CartItem) => {
    if (unit_price) {
      const unitPrice = formatMoney(unit_price, theme.moneyFormat);

      const referenceUnit =
        unit_price_measurement.reference_value !== 1
          ? `${unit_price_measurement.reference_value} ${unit_price_measurement.reference_unit}`
          : unit_price_measurement.reference_unit;

      return (
        <div className="text-product-price-small lg:text-product-price-small-desktop">
          {unitPrice} / {referenceUnit}
        </div>
      );
    }
  };

  const renderItemOptions = ({ options_with_values, product_has_only_default_variant }) => {
    if (!product_has_only_default_variant) {
      return options_with_values.map((option) => (
        <div
          className="text-body-small"
          key={`${option.name}-${option.value}`}
        >
          <span className="mr-1 inline-block text-base-secondary">{option.name}:</span>
          {option.value}
        </div>
      ));
    }
  };

  return (
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
        {renderImage(item)}

        <div className="flex w-full flex-col justify-between lg:block">
          <div>
            <div className="text-body-small">{item.vendor}</div>
            <div className="mb-2 flex justify-between">
              <div>
                <div className="mb-2 text-title last:mb-0 lg:text-title-desktop">
                  <a
                    href={item.url}
                    className="inline-block align-top no-underline hover:opacity-90"
                  >
                    {item.product_title}
                  </a>
                </div>
                <div className="mb-2 last:mb-0">
                  {renderPrice(item)}
                  {renderUnitPrice(item)}
                  {renderItemOptions(item)}
                  {renderProperties(item.properties)}
                </div>
              </div>
              <div className="-mt-[2px] ml-1 max-w-[40%] shrink-0 text-right text-product-price-large text-base-secondary lg:text-product-price-large-desktop [&>*]:block">
                {renderTotalPrice(item)}
              </div>
            </div>
            <div className="mb-2 flex items-center text-body-small text-base-secondary">
              {item.line_level_discount_allocations.length > 0 &&
                item.line_level_discount_allocations.map(({ discount_application }) => (
                  <DrawerLineItemDiscount
                    key={discount_application.key}
                    title={discount_application.title}
                  />
                ))}
            </div>
          </div>
          <div>
            <button type="button">
              <span className="text-body-small">+ Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecommendationsItem;

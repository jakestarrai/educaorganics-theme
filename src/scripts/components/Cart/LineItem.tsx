import { h, Fragment, FunctionComponent } from 'preact';
import { useRef } from 'preact/hooks';
import { formatMoney } from '@shopify/theme-currency/currency';
import { getId } from 'helpers/utils';

import { CartItem } from 'types';
import theme from 'helpers/themeSettings';

import { LineItemDiscountBlock } from 'components/Cart/LineItemDiscountBlock';
import { useHandleQuantity } from 'hooks/useHandleQuantity';
import { Image } from '../Image';

interface PropsType {
  item?: CartItem;
}

const LineItem: FunctionComponent<PropsType> = ({ item }) => {
  const { inputValue, setInputValue, handleChange, handleUpdateItem, removeItem, changeQuantity, decreaseQuantity } =
    useHandleQuantity(item);

  const mobileQuantityInputRef = useRef<HTMLInputElement>();
  const quantityInputRef = useRef<HTMLInputElement>();

  const renderImage = ({ featured_image, url, product_title }) =>
    featured_image.url && (
      <div className="mr-5 flex w-16 shrink-0 md:w-[90px]">
        <a
          href={url}
          className="block w-full"
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
          <div key={getId()}>
            {key}: {properties[key]}
          </div>
        )
    );
  };

  const renderPrice = ({ original_price, price, final_price }) => {
    if (original_price !== final_price) {
      return (
        <Fragment>
          <del
            className="text-base-sale-price"
            dangerouslySetInnerHTML={{ __html: formatMoney(original_price, theme.moneyFormat) }}
          />
          <ins
            className="no-underline"
            dangerouslySetInnerHTML={{ __html: formatMoney(final_price, theme.moneyFormat) }}
          />
        </Fragment>
      );
    }

    return <div dangerouslySetInnerHTML={{ __html: formatMoney(price, theme.moneyFormat) }} />;
  };

  const renderTotalPrice = ({ final_line_price, original_line_price }) => {
    const finalPrice = (
      <div className="text-product-price-large lg:text-product-price-large-desktop">
        {original_line_price !== final_line_price ? (
          <ins
            className="no-underline"
            dangerouslySetInnerHTML={{ __html: formatMoney(final_line_price, theme.moneyFormat) }}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: formatMoney(final_line_price, theme.moneyFormat) }} />
        )}
      </div>
    );

    if (original_line_price !== final_line_price) {
      return (
        <Fragment>
          <div className="text-product-price-large lg:text-product-price-large-desktop">
            <del
              className="text-base-sale-price"
              dangerouslySetInnerHTML={{ __html: formatMoney(original_line_price, theme.moneyFormat) }}
            />
          </div>
          {finalPrice}
        </Fragment>
      );
    }

    return finalPrice;
  };

  const renderUnitPrice = ({ unit_price, unit_price_measurement }: CartItem) => {
    if (unit_price) {
      const unitPrice = formatMoney(unit_price, theme.moneyFormat);

      const referenceUnit =
        unit_price_measurement.reference_value !== 1
          ? `${unit_price_measurement.reference_value} ${unit_price_measurement.reference_unit}`
          : unit_price_measurement.reference_unit;

      return (
        <div className="pt-2 text-product-price-small md:pt-0 lg:text-product-price-small-desktop">
          {unitPrice} / {referenceUnit}
        </div>
      );
    }
  };

  const renderItemOptions = ({ options_with_values, product_has_only_default_variant }) => {
    if (!product_has_only_default_variant) {
      return options_with_values.map((option) => (
        <div
          className="mb-1"
          key={`${option.name}-${option.value}`}
        >
          <span className="mr-1 inline-block text-base-secondary">{option.name}:</span>
          {option.value}
        </div>
      ));
    }
  };

  return (
    <tr
      className="
        group
        border-b
        border-base-border
        align-top
        md:align-middle
      "
    >
      <td
        className="
          w-3/5
          py-3
          text-left
          md:w-2/5
          md:py-4
          md:pl-4
          md:group-first:pt-10
        "
      >
        <div className="flex md:items-center">
          {renderImage(item)}
          <div>
            {theme.cart.showVendor && <div className="mb-1 text-body-small text-base-secondary">{item.vendor}</div>}
            <div className="mb-2 text-title lg:text-title-desktop">
              <a
                href={item.url}
                className="no-underline hover:underline"
              >
                {item.product_title}
              </a>
            </div>
            <div className="mb-3 md:hidden">
              <label
                htmlFor={`updates_mobile_${item.key}`}
                className="sr-only"
              >
                Qty
              </label>
              <div
                className="
                  jcf-number
                  relative
                  flex
                  w-full
                  border
                  border-base-border
                "
              >
                <button
                  className="
                    jcf-btn-dec
                    relative
                    min-h-full
                    min-w-button-sm
                    shrink-0
                    bg-transparent
                    before:absolute
                    before:left-1/2
                    before:top-1/2
                    before:h-[2px]
                    before:w-3
                    before:-translate-x-1/2
                    before:-translate-y-1/2
                    before:bg-base-body
                    before:transition-colors
                    before:duration-300
                    before:ease-in-out
                    before:content-['']
                    hover:before:bg-base-secondary
                  "
                  type="button"
                  onMouseDown={decreaseQuantity}
                  onMouseUp={changeQuantity}
                >
                  <span className="sr-only">Decrease quantity</span>
                </button>
                <input
                  type="number"
                  id={`updates_mobile_${item.key}`}
                  className="
                    block
                    min-h-button-sm
                    w-full
                    bg-transparent
                    p-2
                    text-center
                    text-body-medium
                    leading-none
                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none
                  "
                  name="updates[]"
                  ref={mobileQuantityInputRef}
                  value={inputValue}
                  onChange={handleChange}
                  onBlur={handleUpdateItem}
                  min="0"
                  aria-label={theme.cart.quantity}
                />
                <button
                  className="
                    jcf-btn-inc
                    relative
                    min-h-full
                    min-w-button-sm
                    shrink-0
                    bg-transparent
                    before:absolute
                    before:left-1/2
                    before:top-1/2
                    before:h-[2px]
                    before:w-3
                    before:-translate-x-1/2
                    before:-translate-y-1/2
                    before:bg-base-body
                    before:transition-colors
                    before:duration-300
                    before:ease-in-out
                    before:content-['']
                    after:absolute
                    after:left-1/2
                    after:top-1/2
                    after:h-3
                    after:w-[2px]
                    after:-translate-x-1/2
                    after:-translate-y-1/2
                    after:bg-base-body
                    after:transition-colors
                    after:duration-300
                    after:ease-in-out
                    after:content-['']
                    hover:before:bg-base-secondary
                    hover:after:bg-base-secondary
                  "
                  type="button"
                  onMouseDown={() => {
                    setInputValue(inputValue + 1);
                  }}
                  onMouseUp={changeQuantity}
                >
                  <span className="sr-only">Increase quantity</span>
                </button>
              </div>
            </div>
            <div className="text-body-small">
              {renderItemOptions(item)}
              {renderProperties(item.properties)}
            </div>
            {item.selling_plan_allocation?.selling_plan?.name && (
              <div className="mb-2 text-body-small text-base-secondary">
                {item.selling_plan_allocation.selling_plan.name}
              </div>
            )}
            <div className="mb-2 text-body-small text-base-secondary">
              <ul>
                {item.line_level_discount_allocations.length > 0 &&
                  item.line_level_discount_allocations.map(({ discount_application }) => (
                    <LineItemDiscountBlock
                      key={discount_application.key}
                      title={discount_application.title}
                    />
                  ))}
              </ul>
            </div>
            <button
              className="text-body-small"
              onClick={removeItem}
            >
              {theme.cart.remove}
            </button>
          </div>
        </div>
      </td>
      <td
        className="
          w-[30%]
          py-3
          text-right
          md:w-[18%]
          md:px-3
          md:py-4
          md:group-first:pt-10
        "
      >
        <div
          className="
            mt-[23px]
            flex
            flex-wrap
            items-center
            justify-end
            gap-1
            text-product-price-large
            md:mt-0
            lg:text-product-price-large-desktop
          "
        >
          {renderPrice(item)}
        </div>
        {renderUnitPrice(item)}
      </td>
      <td
        className="
          hidden
          md:table-cell
          md:w-1/5
          md:px-3
          md:py-4
          md:text-right
          md:group-first:pt-10
        "
      >
        <label
          htmlFor={`updates_${item.key}`}
          className="sr-only"
        >
          Quantity
        </label>
        <div
          className="
            jcf-number
            relative
            ml-auto
            flex
            max-w-[140px]
            border
            border-base-border
          "
        >
          <button
            className="
              jcf-btn-dec
              relative
              min-h-full
              min-w-button-sm
              shrink-0
              bg-transparent
              before:absolute
              before:left-1/2
              before:top-1/2
              before:h-[2px]
              before:w-3
              before:-translate-x-1/2
              before:-translate-y-1/2
              before:bg-base-body
              before:transition-colors
              before:duration-300
              before:ease-in-out
              before:content-['']
              hover:before:bg-base-secondary
            "
            type="button"
            onMouseDown={decreaseQuantity}
            onMouseUp={changeQuantity}
          >
            <span className="sr-only">Decrease quantity</span>
          </button>
          <input
            type="number"
            id={`updates_${item.key}`}
            className="
              block
              min-h-button-sm
              w-full
              bg-transparent
              p-2
              text-center
              text-body-medium
              leading-none
              [appearance:textfield]
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none
            "
            name="updates[]"
            ref={quantityInputRef}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleUpdateItem}
            min="0"
            aria-label={theme.cart.quantity}
          />
          <button
            className="
              jcf-btn-inc
              relative
              min-h-full
              min-w-button-sm
              shrink-0
              bg-transparent
              before:absolute
              before:left-1/2
              before:top-1/2
              before:h-[2px]
              before:w-3
              before:-translate-x-1/2
              before:-translate-y-1/2
              before:bg-base-body
              before:transition-colors
              before:duration-300
              before:ease-in-out
              before:content-['']
              after:absolute
              after:left-1/2
              after:top-1/2
              after:h-3
              after:w-[2px]
              after:-translate-x-1/2
              after:-translate-y-1/2
              after:bg-base-body
              after:transition-colors
              after:duration-300
              after:ease-in-out
              after:content-['']
              hover:before:bg-base-secondary
              hover:after:bg-base-secondary
            "
            type="button"
            onMouseDown={() => {
              setInputValue(inputValue + 1);
            }}
            onMouseUp={changeQuantity}
          >
            <span className="sr-only">Increase quantity</span>
          </button>
        </div>
      </td>
      <td
        className="
          hidden
          md:table-cell
          md:w-[19%]
          md:py-4
          md:pr-4
          md:text-right
          md:group-first:pt-10
        "
      >
        {renderTotalPrice(item)}
      </td>
    </tr>
  );
};

export default LineItem;

import { h, Fragment, FunctionComponent } from 'preact';
import { useRef } from 'preact/hooks';
import { formatMoney } from '@shopify/theme-currency/currency';
import { getId } from 'helpers/utils';

import { CartItem } from 'types';
import theme from 'helpers/themeSettings';

import { useHandleQuantity } from 'hooks/useHandleQuantity';
import { useSellingPlanAdd } from 'hooks/useSellingPlanAdd';
import { Image } from '../Image';
import { DrawerLineItemDiscount } from './DrawerLineItemDiscount';
import { SellingPlan } from './SellingPlan';

interface PropsType {
  item?: CartItem;
}

const LineItem: FunctionComponent<PropsType> = ({ item }) => {
  const {
    inputValue,
    setInputValue,
    handleChange,
    handleUpdateItem,
    removeItem,
    changeQuantity,
    decreaseQuantity,
    cartError,
  } = useHandleQuantity(item);

  const { updateSellingPlanItem } = useSellingPlanAdd(item);

  const mobileQuantityInputRef = useRef<HTMLInputElement>();

  const renderImage = ({ featured_image, url, product_title }) =>
    featured_image.url && (
      <div className="relative w-24 shrink-0 self-start">
        <a
          href={url}
          className="block overflow-hidden rounded-md"
          aria-label={product_title}
        >
          <Image
            src={featured_image.url}
            sizes={['64x82', '90x112', '90x112']}
            ratio={featured_image.aspect_ratio}
            alt={featured_image.alt}
            fetchpriority="low"
          />
        </a>
        {item.selling_plan_allocation && (
          <button
            className="
              absolute
              left-[6px]
              top-[6px]
              z-2
              h-6
              w-6"
            onClick={(event) => {
              event.preventDefault();
              updateSellingPlanItem(null);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                fill="#edf979"
              />
              <path
                d="M18.3964 14.6036C18.5917 14.7988 18.9083 14.7988 19.1036 14.6036L22.2855 11.4216C22.4808 11.2263 22.4808 10.9097 22.2855 10.7145C22.0903 10.5192 21.7737 10.5192 21.5784 10.7145L18.75 13.5429L15.9216 10.7145C15.7263 10.5192 15.4097 10.5192 15.2145 10.7145C15.0192 10.9097 15.0192 11.2263 15.2145 11.4216L18.3964 14.6036ZM11.8472 5.75C15.3885 5.75 18.25 8.58811 18.25 12.0776H19.25C19.25 8.02552 15.9305 4.75 11.8472 4.75V5.75ZM18.25 12.0776V14.25H19.25V12.0776H18.25ZM7.11727 7.81271C8.28817 6.54523 9.97282 5.75 11.8472 5.75V4.75C9.68421 4.75 7.73628 5.66895 6.38273 7.13414L7.11727 7.81271Z"
                fill="#2b2627"
              />
              <path
                d="M5.60355 9.39645C5.40829 9.20118 5.09171 9.20118 4.89645 9.39645L1.71447 12.5784C1.5192 12.7737 1.5192 13.0903 1.71447 13.2855C1.90973 13.4808 2.22631 13.4808 2.42157 13.2855L5.25 10.4571L8.07843 13.2855C8.27369 13.4808 8.59027 13.4808 8.78553 13.2855C8.9808 13.0903 8.9808 12.7737 8.78553 12.5784L5.60355 9.39645ZM11.9371 17.875C8.50974 17.875 5.75 15.1592 5.75 11.8319H4.75C4.75 15.7319 7.97809 18.875 11.9371 18.875V17.875ZM5.75 11.8319V9.75H4.75V11.8319H5.75ZM16.5096 15.903C15.3787 17.114 13.7503 17.875 11.9371 17.875V18.875C14.0351 18.875 15.9258 17.9933 17.2404 16.5855L16.5096 15.903Z"
                fill="#2b2627"
              />
            </svg>
          </button>
        )}
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
        <div className="flex flex-wrap items-center gap-1 text-product-price-small lg:text-product-price-small-desktop">
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
      <div className="flex flex-wrap items-center gap-1 text-product-price-small text-base-secondary lg:text-product-price-small-desktop">
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
    <div
      className="
        flex
        items-center
        gap-4
        border-b
        border-[#c9c9c9]
        py-6"
      data-test-id="cart-container"
    >
      {renderImage(item)}

      <div className="flex w-full flex-col gap-3">
        {theme.cart.showVendor && <div className="text-body-small">{item.vendor}</div>}
        <div className="flex w-full justify-between gap-4">
          <div>
            <div className="text-body-small font-medium">
              <a
                href={item.url}
                className="inline-block align-top no-underline hover:opacity-90"
              >
                {item.product_title}
              </a>
            </div>
            <div className="mb-2 text-body-xxs last:mb-0 lg:text-body-xs">Strawberry Kiwi | 30 servings</div>
          </div>
          <div className="max-w-[40%] shrink-0 text-right text-body-xs lg:text-body-small [&>*]:block">
            {renderTotalPrice(item)}
          </div>
        </div>
        {item.selling_plan_allocation?.selling_plan?.name && (
          <div className="text-body-small">{item.selling_plan_allocation.selling_plan.name}</div>
        )}
        {item.line_level_discount_allocations.length > 0 && (
          <div className="flex items-center text-body-small">
            {item.line_level_discount_allocations.map(({ discount_application }) => (
              <DrawerLineItemDiscount
                key={discount_application.key}
                title={discount_application.title}
              />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <div className="w-22 shrink-0">
            <label
              htmlFor="quantity-1"
              className="sr-only"
            >
              Qty
            </label>
            <div
              className="
                jcf-number
                relative
                flex
                h-8
                w-full
                overflow-hidden
                rounded-md
                border
                border-[#9b9b9b]
              "
            >
              <button
                className="
                  jcf-btn-dec
                  relative
                  min-h-full
                  min-w-[28px]
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
                data-test-id="added-quantity"
                className="
                  block
                  h-full
                  w-full
                  bg-transparent
                  text-center
                  text-body-xxs
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
                  min-w-[28px]
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
          {item.selling_plan_allocation && (
            <div>
              <button
                className="
                rounded-xl
                bg-june-dark
                px-3
                py-2
                text-center
                text-caps-xs
                uppercase
                leading-none
                text-base-accent
                lg:px-4
                lg:text-caps-s"
              >
                {theme.cart.subscribe_applied.replace(
                  '{{ discount }}',
                  item.selling_plan_allocation.selling_plan.price_adjustments[0].value
                )}
              </button>
            </div>
          )}
        </div>

        <SellingPlan item={item} />
        {cartError?.error && cartError?.key === item.key && <div className="text-body-xs">{cartError.error}</div>}
      </div>
    </div>
  );
};

export default LineItem;

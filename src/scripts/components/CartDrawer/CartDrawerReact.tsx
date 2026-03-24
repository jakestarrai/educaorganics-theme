import { h, FunctionComponent, render, Fragment } from 'preact';
import { Provider, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'preact/hooks';
import { formatMoney } from '@shopify/theme-currency/currency';

import { useSelector } from 'store/hook';
import { cartSelector } from 'store/selectors';
import theme from 'helpers/themeSettings';
import { Discount } from 'components/icons/Discount';
import Button from 'components/Button';
import { addItem } from 'store/features/cart/cartSlice';
import DrawerLineItem from './DrawerLineItem';
import { DrawerFreeShippingBar } from './DrawerFreeShippingBar';
import { CartDiscountBlock } from './DrawerDiscountBlock';
import { CartRecommendations } from './CartRecommendations';
import { Image } from '../Image';

const CartDrawer: FunctionComponent = () => {
  const {
    cart: { total_discount, note, items, total_price, cart_level_discount_applications, item_count },
  } = useSelector(cartSelector);

  const productFormContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [productAdding, setProductAdding] = useState(false);

  useEffect(() => {
    if (productFormContainerRef.current) {
      window.addEventListener('productAddedOpenDrawer', () => {
        productFormContainerRef.current.scrollTop = 0;
      });
    }
  }, []);

  const handleATC = (item) => {
    setProductAdding(true);

    try {
      const availableVariant = item.variants.find((variant) => variant.available);

      dispatch(
        addItem({
          id: availableVariant.id,
          quantity: {
            quantity: 1,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderHandleImage = (image) =>
    image && (
      <Image
        src={image}
        sizes={['178x166', '230x226']}
        ratio={image.aspect_ratio}
        alt={image.alt}
      />
    );

  const renderImage = ({ media }) =>
    media[0].src && (
      <Image
        src={media[0].src}
        sizes={['74x103']}
        ratio={media.aspect_ratio}
        alt={media.alt}
      />
    );

  const convertedPrice = Math.round((theme.cart.cartTargetPrice * window.Shopify.currency.rate) / 100) * 100;

  const freeShippingThreshold = Math.max(convertedPrice - total_price, 0);

  const renderEmptyState = () => (
    <Fragment>
      <div className="flex-1 overflow-auto px-6 lg:px-10">
        <div className="py-6 lg:py-10">
          <div className="mb-14 text-center last:mb-0 lg:mb-22">
            <div
              className="
                  relative
                  z-2
                  mx-auto
                  -mb-11
                  flex
                  h-[166px]
                  max-w-[178px]
                  items-center
                  justify-center
                  lg:-mb-18
                  lg:h-[226px]
                  lg:max-w-[230px]"
            >
              {renderHandleImage(theme.cart.emptyCartImage)}
            </div>
            <div
              className="
                  supports-cookies
                  mb-2
                  font-custom-heading
                  text-d2
                  lg:text-[88px]
                  lg:-tracking-[1.76px]"
            >
              {theme.cart.empty}
            </div>

            <div className="prose mb-6 text-body-xs last:mb-0 lg:text-body-small">
              <p>
                {theme.cart.spend_for_free_shipping.replace(
                  '{{ price }}',
                  formatMoney(freeShippingThreshold, theme.moneyFormat)
                )}
              </p>
            </div>
          </div>

          <div>
            <div className="font-heading text-h4 lg:text-h4-desktop">{theme.cart.recommended_for_you}</div>
            {theme.cart.cartDrawerRecommendations.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-[#c9c9c9] py-6"
              >
                <div className="w-24 shrink-0 self-start">{renderImage(item)}</div>
                <div className="w-full">
                  <div className="mb-6 flex justify-between gap-4 last:mb-0">
                    <div className="pb-1">
                      <div className="text-body-small font-medium">
                        <a
                          href="/products/fitness-recovery-infant formula-fastmelts-test?variant=40546966601774"
                          className="inline-block align-top no-underline hover:opacity-90"
                        >
                          {item.title}
                        </a>
                      </div>
                      <div className="mb-2 text-body-xxs last:mb-0 lg:text-body-xs">Premium Formula | 30 servings</div>
                    </div>
                    <div className="max-w-[40%] shrink-0 text-right text-body-xs lg:text-body-small [&>*]:block">
                      <div dangerouslySetInnerHTML={{ __html: formatMoney(item.price, theme.moneyFormat) }} />
                    </div>
                  </div>
                  <div className="border-t-2 border-june-dark pt-1">
                    <button
                      type="button"
                      onClick={() => handleATC(item)}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        text-caps-s
                        uppercase"
                    >
                      <span>{theme.strings.addToBag}</span>
                      <span className="h-6 w-6 shrink-0">
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12.5"
                            r="8.625"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M16.5 12.5L7.49963 12.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M12 17.0002L12 7.99988"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#c9c9c9] p-6 lg:px-10 lg:pt-9">
        {items.length > 0 ? (
          <Button
            href="/checkout"
            className="mb-4 w-full last:mb-0"
            color="primary"
            size="md"
            text={theme.cart.checkout}
          />
        ) : (
          <Button
            href={theme.cart.continue_shopping_link}
            className="mb-4 w-full last:mb-0"
            color="primary"
            size="md"
            text={theme.cart.shop_all_products}
          />
        )}

        <div
          className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
              text-caps-xs
              uppercase
              lg:text-caps-s"
        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 shrink-0">
              <svg
                width="25"
                height="24"
                className="h-full w-full"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.875 12.1875C4.875 8.07988 8.20489 4.75 12.3125 4.75C13.6689 4.75 14.9376 5.11216 16.0306 5.74439L17.032 4.01318C15.6429 3.2096 14.0298 2.75 12.3125 2.75C7.10032 2.75 2.875 6.97531 2.875 12.1875C2.875 17.3997 7.10032 21.625 12.3125 21.625C17.5247 21.625 21.75 17.3997 21.75 12.1875H19.75C19.75 16.2951 16.4202 19.625 12.3125 19.625C8.20489 19.625 4.875 16.2951 4.875 12.1875ZM8.89464 10.2774L12.3154 13.6981L21.7097 4.30412L23.1238 5.71835L13.0225 15.8194L12.3154 16.5265L11.6083 15.8194L7.48043 11.6916L8.89464 10.2774Z"
                  fill="#2b2627"
                />
              </svg>
            </div>
            <div>{theme.cart.guarantee}</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-6 w-6 shrink-0">
              <svg
                width="25"
                height="24"
                className="h-full w-full"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.125 16.6875L12.5 20.7235L3.875 16.6875V7.22349L12.5 3.18747L21.125 7.22349V16.6875Z"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
                <path
                  d="M3.875 7.31238L8.1875 9.33039L12.5 11.3484L21.125 7.31238"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
                <path
                  d="M8.1875 9.28583L16.8125 5.24982"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
                <line
                  x1="12.5625"
                  y1="11.4374"
                  x2="12.5625"
                  y2="20.2499"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>{theme.cart.free_returns}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const renderCart = () => (
    <Fragment>
      <div
        className="flex-1 overflow-auto px-6 lg:px-10 lg:pt-4"
        ref={productFormContainerRef}
      >
        <form
          action="#"
          className="pb-6 last:pb-0"
        >
          {items.map((item) => (
            <DrawerLineItem
              key={item.id}
              item={item}
            />
          ))}
        </form>
        {theme.cart.cartEnableRecommendations && <CartRecommendations />}
      </div>

      <div className="border-t border-[#c9c9c9] p-6 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-caps-s uppercase">{theme.cart.subtotal}:</div>
          <div
            className="text-body-small font-medium"
            dangerouslySetInnerHTML={{ __html: formatMoney(total_price, theme.moneyFormat) }}
          />
        </div>
        {cart_level_discount_applications.length > 0 &&
          cart_level_discount_applications.map((discount) => (
            <CartDiscountBlock
              key={discount.key}
              title={discount.title}
            />
          ))}
        {total_discount > 0 && (
          <div className="mb-4 flex justify-between gap-1 text-body-small last:mb-0">
            <div className="item-center flex">
              <div className="mx-1 mt-[2px] w-[18px] shrink-0 text-base-body">
                <Discount />
              </div>
              <div>{theme.cart.savings}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: formatMoney(total_discount, theme.moneyFormat) }} />
          </div>
        )}
        {theme.cart.CartTaxesInclude && (
          <div
            className="
              mb-4
              border-t-2
              border-june-dark
              pt-4
              text-center
              text-body-xxs
              last:mb-0
              lg:text-body-xs"
          >
            {theme.cart.tax_include_text}
          </div>
        )}
        <Button
          href="/checkout"
          className="mb-4 w-full last:mb-0"
          color="primary"
          size="md"
          text={theme.cart.checkout}
        />

        <div
          className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
              text-caps-xs
              uppercase
              lg:text-caps-s"
        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 shrink-0">
              <svg
                width="25"
                height="24"
                className="h-full w-full"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.875 12.1875C4.875 8.07988 8.20489 4.75 12.3125 4.75C13.6689 4.75 14.9376 5.11216 16.0306 5.74439L17.032 4.01318C15.6429 3.2096 14.0298 2.75 12.3125 2.75C7.10032 2.75 2.875 6.97531 2.875 12.1875C2.875 17.3997 7.10032 21.625 12.3125 21.625C17.5247 21.625 21.75 17.3997 21.75 12.1875H19.75C19.75 16.2951 16.4202 19.625 12.3125 19.625C8.20489 19.625 4.875 16.2951 4.875 12.1875ZM8.89464 10.2774L12.3154 13.6981L21.7097 4.30412L23.1238 5.71835L13.0225 15.8194L12.3154 16.5265L11.6083 15.8194L7.48043 11.6916L8.89464 10.2774Z"
                  fill="#2b2627"
                />
              </svg>
            </div>
            <div>satisfaction guarantee</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-6 w-6 shrink-0">
              <svg
                width="25"
                height="24"
                className="h-full w-full"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.125 16.6875L12.5 20.7235L3.875 16.6875V7.22349L12.5 3.18747L21.125 7.22349V16.6875Z"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
                <path
                  d="M3.875 7.31238L8.1875 9.33039L12.5 11.3484L21.125 7.31238"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
                <path
                  d="M8.1875 9.28583L16.8125 5.24982"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
                <line
                  x1="12.5625"
                  y1="11.4374"
                  x2="12.5625"
                  y2="20.2499"
                  stroke="#2b2627"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>free returns</div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div
      className={`${
        theme.cart.cartEnableRecommendations ? 'ml-auto' : ''
      } flex h-full flex-col justify-between bg-base-body-background sm:ml-auto sm:w-[480px] sm:rounded-l-2xl`}
    >
      <div>
        <div
          className="
            flex
            items-center
            justify-between
            gap-9
            p-6
            lg:px-10"
        >
          <div className="font-heading text-h3 lg:text-h3-desktop">{theme.cart.cart_drawer_lable}</div>
          <button
            type="button"
            className="
              cart-drawer-closer
              relative
              min-h-[36px]
              min-w-[36px]
              before:absolute
              before:left-1/2
              before:top-1/2
              before:h-[2px]
              before:w-[70%]
              before:-translate-x-1/2
              before:-translate-y-1/2
              before:-rotate-45
              before:bg-current
              before:content-['']
              after:absolute
              after:left-1/2
              after:top-1/2
              after:h-[2px]
              after:w-[70%]
              after:-translate-x-1/2
              after:-translate-y-1/2
              after:rotate-45
              after:bg-current
              after:content-['']
              "
            aria-label="Close cart drawer"
          />
        </div>
        {theme.cart.showShippingIndicator && (
          <DrawerFreeShippingBar
            threshold={freeShippingThreshold}
            price={convertedPrice}
          />
        )}
      </div>

      {items?.length ? renderCart() : renderEmptyState()}
    </div>
  );
};

export default CartDrawer;

const cartDrawerElement = document.getElementById('cart-drawer');

if (cartDrawerElement) {
  /* eslint-disable */
  render(
    <Provider store={window.Store}>
      <CartDrawer ref={(element) => (window.cart = element)} />
    </Provider>,
    cartDrawerElement
  );
  /* eslint-enable */
}

import { h, FunctionComponent, render } from 'preact';
import { Provider } from 'react-redux';
import { formatMoney } from '@shopify/theme-currency/currency';

import { useSelector } from 'store/hook';
import { cartSelector } from 'store/selectors';
import theme from 'helpers/themeSettings';

import { CartDiscountBlock } from 'components/Cart/CartDiscountBlock';
import Button from 'components/Button';
import LineItem from './LineItem';

const Cart: FunctionComponent = () => {
  const {
    cart: { total_discount, note, items, total_price, cart_level_discount_applications },
  } = useSelector(cartSelector);

  const ref = document.getElementById('cart');

  const renderEmptyState = () => (
    <div className="md:flex">
      <div className="md:mx-auto md:w-8/12">
        <div className="py-24 text-center">
          <div className="mb-4">
            <h1 className="font-heading text-h5">{theme.cart.title}</h1>
          </div>

          <div className="supports-cookies prose mb-5">
            <p>{theme.cart.empty}</p>
          </div>

          <div>
            <a
              href={theme.cart.continue_shopping_link}
              className="link"
            >
              {theme.cart.continue_shopping_text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiscount = () => {
    if (total_discount > 0) {
      return (
        <div>
          {theme.cart.savings} {formatMoney(total_discount, theme.moneyFormat)}
        </div>
      );
    }
  };

  const renderNote = () => (
    <div className="mb-10 md:mb-0 md:w-5/12 md:px-5">
      <label
        className="mb-1 inline-block"
        htmlFor="CartSpecialInstructions"
      >
        {theme.cart.note}
      </label>
      <textarea
        name="note"
        className="
          form-textarea
          max-h-[300px]
          min-h-[88px]
          w-full
          rounded-form-element
          border-base-border
          bg-base-body-background
          text-body-medium
        "
        placeholder={theme.cart.special_instructions_placeholder}
        id="CartSpecialInstructions"
      >
        {note}
      </textarea>
    </div>
  );

  const renderCart = () => (
    <div>
      <div className="mb-10 text-center">
        <h1 className="mb-4 font-heading text-h5 md:mb-2">{theme.cart.title}</h1>
      </div>

      <div className="lg:flex">
        <div className="lg:mx-auto lg:w-10/12">
          <form
            action="/cart"
            method="post"
            noValidate
          >
            <table className="mb-5 w-full table-fixed border-collapse md:mb-10">
              <thead>
                <tr
                  className="
                    border-b
                    border-base-border
                    align-top
                    text-base-secondary
                    md:align-middle
                  "
                >
                  <th
                    className="
                      w-3/5
                      py-3
                      text-left
                      font-normal
                      md:w-2/5
                      md:py-4
                      md:pl-4
                    "
                  >
                    {theme.cart.product}
                  </th>
                  <th
                    className="
                      w-[30%]
                      py-3
                      text-right
                      font-normal
                      md:w-[18%]
                      md:px-3
                      md:py-4
                      md:group-first:pt-10
                    "
                  >
                    {theme.cart.price}
                  </th>
                  <th
                    className="
                      hidden
                      md:table-cell
                      md:w-1/5
                      md:px-3
                      md:py-4
                      md:text-right
                      md:font-normal
                      md:group-first:pt-10
                    "
                  >
                    {theme.cart.quantity}
                  </th>
                  <th
                    className="
                      hidden
                      md:table-cell
                      md:w-[19%]
                      md:py-4
                      md:pr-4
                      md:text-right
                      md:font-normal
                      md:group-first:pt-10
                    "
                  >
                    {theme.cart.total}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <LineItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </tbody>
            </table>

            <div className="md:flex md:justify-between md:space-x-8 md:py-5">
              {ref.dataset.noteEnable === 'true' && renderNote()}
              <div className="md:ml-auto md:w-5/12">
                <div className="mb-3 md:text-right">
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      justify-between
                      md:mb-2
                      md:justify-end
                    "
                  >
                    <div className="mr-8">{theme.cart.total}:</div>
                    <div
                      className="text-product-price-large lg:text-product-price-large-desktop"
                      dangerouslySetInnerHTML={{ __html: formatMoney(total_price, theme.moneyFormat) }}
                    />
                  </div>
                  <div className="text-center text-body-small text-base-secondary md:text-right">
                    {cart_level_discount_applications.length > 0 && (
                      <div className="mb-2 text-base-secondary">
                        <ul className="inline-block">
                          {cart_level_discount_applications.map((discount) => (
                            <CartDiscountBlock
                              key={discount.key}
                              title={discount.title}
                            />
                          ))}
                        </ul>
                      </div>
                    )}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: theme.cart.shipping_at_checkout,
                      }}
                    />
                  </div>
                </div>
                <div className="md:text-right">
                  <Button
                    element="button"
                    type="submit"
                    className="w-full whitespace-normal text-center md:w-auto"
                    color="primary"
                    size="md"
                    name="checkout"
                    text={theme.cart.checkout}
                  />
                </div>
                {theme.cart.additional_checkout_buttons && (
                  <div
                    className="cart__dynamic-checkout-buttons additional-checkout-buttons"
                    dangerouslySetInnerHTML={{
                      __html: theme.cart.content_for_additional_checkout_buttons,
                    }}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <div className="container max-w-screen-3xl">{items?.length ? renderCart() : renderEmptyState()}</div>;
};

export default Cart;

const cartElement = document.getElementById('cart');

if (cartElement) {
  /* eslint-disable */
  render(
    <Provider store={window.Store}>
      <Cart ref={(element) => (window.cart = element)} />
    </Provider>,
    cartElement
  );
  /* eslint-enable */
}

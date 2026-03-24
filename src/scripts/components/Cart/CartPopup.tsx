import { trapFocus as trapFocusShopify, removeTrapFocus } from '@shopify/theme-a11y';
import { h, render, FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Provider } from 'react-redux';

import { useSelector, useDispatch } from 'store/hook';
import { cartSelector } from 'store/selectors';
import { closePopup } from 'store/features/cart/cartSlice';
import theme from 'helpers/themeSettings';
import Button from 'components/Button';
import CartJustAdded from './CartJustAdded';

const CartPopup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const cartRef = useRef<HTMLDivElement>();

  const trapFocus = () => {
    trapFocusShopify(cartRef.current);
  };

  const initCloseEvent = (e) => {
    if (cart.popupActive && !e.target.closest(`.${cartRef.current.className}`)) {
      dispatch(closePopup());
    }
  };

  useEffect(() => {
    document.querySelector('body').addEventListener('click', (e) => initCloseEvent(e));
  }, []);

  useEffect(() => {
    if (cart.popupActive && cartRef.current) {
      trapFocus();
    }

    return () => {
      removeTrapFocus();
    };
  }, [cart.popupActive, cartRef]);

  return (
    <div
      ref={cartRef}
      data-test-id="cart-container"
      className={`
        cart-popup
        fixed
        top-0
        z-[10002]
        w-full
        -translate-y-[150%]
        bg-base-body-background
        text-body-small
        text-black
        shadow-xl
        transition-transform
        duration-300
        ease-in-out
        ${cart.popupActive ? 'active' : ''}
        md:right-0
        md:w-[345px]
        [&.active]:translate-y-0
      `}
    >
      <div className="flex items-center justify-between border-b border-base-border">
        <div className="flex-grow px-4 py-3">{theme.cart.just_added_to_your_cart}</div>
        <button
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
          "
          onClick={() => dispatch(closePopup())}
        >
          <span className="sr-only">Close cart popup</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="icon"
            viewBox="0 0 20 20"
          >
            <path d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z" />
          </svg>
        </button>
      </div>
      <div className="px-4 pb-3">
        <div className="py-3">{cart.justAdded && <CartJustAdded justAdded={cart.justAdded} />}</div>
        <div className="text-center">
          <Button
            href="/cart"
            className="w-full"
            color="primary"
            size="md"
            text={`${theme.cart.view_cart} (${cart.item_count})`}
          />
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
};

const ref = document.querySelector('#cart-popup');

if (ref && theme.cart.cartDrawer === 'popup') {
  render(
    <Provider store={window.Store}>
      <CartPopup />
    </Provider>,
    ref
  );
}

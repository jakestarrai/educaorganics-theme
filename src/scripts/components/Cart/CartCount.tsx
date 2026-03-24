import { FunctionComponent, h, render } from 'preact';
import { Provider } from 'react-redux';

import { cartSelector } from 'store/selectors';
import { useSelector } from 'store/hook';
import theme from 'helpers/themeSettings';

const CartCount: FunctionComponent = () => {
  const { item_count } = useSelector(cartSelector);

  const btnNumClasses = `
        absolute
        right-0
        top-[1px]
        flex
        h-[18px]
        min-w-[18px]
        items-center
        justify-center
        rounded-full
        border
        border-customizable-base
        bg-base-body
        px-[5px]
        py-[2px]
        text-center
        text-[12px]
        font-semibold
        leading-none
        text-customizable-base
        group-hover/cart-icon:opacity-80
        lg:transition-opacity
        lg:duration-300
        lg:ease-in-out
      `;

  const renderCount = () => <span className={btnNumClasses}>{item_count}</span>;

  const btnClasses = `
        ${theme.cart.cartDrawer === 'drawer' ? 'cart-drawer-opener' : ''}
        group/cart-icon
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        text-inherit
        hover:opacity-80
        focus:opacity-80
      `;

  return (
    <a
      href="/cart"
      className={btnClasses}
    >
      {/* need add classes to icon - 'w-[19px] h-auto text-current'  */}
      <div dangerouslySetInnerHTML={{ __html: theme.icons.cart }} />
      {item_count > 0 && renderCount()}
    </a>
  );
};

const ref = document.querySelector('[data-cart-count]');

if (ref) {
  render(
    <Provider store={window.Store}>
      <CartCount />
    </Provider>,
    ref,
    ref.querySelector('a')
  );
}

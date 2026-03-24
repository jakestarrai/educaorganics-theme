import { h, FunctionComponent } from 'preact';
import { StateUpdater } from 'preact/hooks';

import theme from 'helpers/themeSettings';

interface Props {
  quantity: number;
  setQuantity: StateUpdater<number>;
}

const ProductQuantity: FunctionComponent<Props> = ({ quantity, setQuantity }) => {
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="mb-4 md:mb-5 md:w-10/12 xl:w-6/12">
      <label
        className="mb-1 inline-block text-base-secondary"
        htmlFor="Quantity"
      >
        {theme.product.quantity}
      </label>
      <div className="jcf-number relative flex w-full border border-base-border">
        <button
          type="button"
          className="
            jcf-btn-dec
            relative
            min-h-full
            min-w-button-md
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
          onClick={decrementQuantity}
        >
          <span className="sr-only">{theme.product.decrease_quantity}</span>
        </button>
        <input
          type="number"
          id="Quantity"
          className="
            block
            min-h-button-md
            w-full
            bg-transparent
            px-2
            py-3
            text-center
            text-body-small font-bold
            leading-none
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
          "
          name="quantity"
          value={quantity}
          min="1"
          onChange={(e) => {
            if (!(e.target as HTMLInputElement).value) {
              return setQuantity(1);
            }

            setQuantity(parseInt((e.target as HTMLInputElement).value, 10));
          }}
          onBlur={(e) => {
            if (!(e.target as HTMLInputElement).value) {
              return setQuantity(1);
            }
          }}
        />
        <button
          type="button"
          className="
            jcf-btn-inc
            relative
            min-h-full
            min-w-button-md
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
          onClick={incrementQuantity}
        >
          <span className="sr-only">{theme.product.increase_quantity}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;

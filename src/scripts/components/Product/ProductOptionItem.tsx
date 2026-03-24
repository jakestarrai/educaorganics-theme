import { h, FunctionComponent } from 'preact';
import { StateUpdater } from 'preact/hooks';
import { ProductType, VariantType } from 'types';

interface Props {
  name: string;
  idx?: number;
  value: string | number;
  variantOptions: object;
  setVariantOptions: StateUpdater<any>;
  product?: ProductType;
  chosenVariant?: VariantType;
}

const ProductOptionItem: FunctionComponent<Props> = ({
  name,
  idx,
  value,
  variantOptions,
  setVariantOptions,
  product,
}) => {
  const currentVariantObj = product.variants.find(
    // @ts-ignore
    (variant) => variant.options[1] === value && variant.options[0] === variantOptions.color
  );

  const isDisabled = !currentVariantObj?.available;

  return (
    <div className="relative mb-2 mr-2 inline-flex">
      <input
        type="radio"
        id={`filter-field-size-01-${idx}-${value}`}
        className="
          peer
          absolute
          left-0
          top-0
          -z-1
          h-full
          w-full
          opacity-0
        "
        name={`filter-field-size-${idx}-${value}`}
        onChange={() =>
          setVariantOptions({
            ...variantOptions,
            [name]: value,
          })
        }
        checked={variantOptions && variantOptions[name] === value}
        disabled={isDisabled}
      />
      <label
        htmlFor={`filter-field-size-01-${idx}-${value}`}
        className="
          relative
          flex
          min-h-[44px]
          min-w-[44px]
          cursor-pointer
          items-center
          justify-center
          overflow-hidden
          border
          border-base-border
          p-[2px]
          text-body-medium
          uppercase
          text-base-body
          transition-colors
          duration-300
          after:absolute
          after:left-1/2
          after:top-1/2
          after:z-2
          after:h-[calc(100%+16px)]
          after:w-[1px]
          after:-translate-x-1/2
          after:-translate-y-1/2
          after:rotate-45
          after:bg-base-border
          after:opacity-0
          after:content-['']
          peer-checked:border-base-body
          peer-checked:bg-base-body
          peer-checked:text-customizable-base
          peer-focus:border-base-body
          peer-focus:bg-base-body
          peer-focus:text-customizable-base
          peer-disabled:cursor-default
          peer-disabled:bg-base-accent
          peer-disabled:text-base-secondary
          peer-disabled:after:opacity-100
          "
      >
        <span>{value}</span>
      </label>
    </div>
  );
};

export default ProductOptionItem;

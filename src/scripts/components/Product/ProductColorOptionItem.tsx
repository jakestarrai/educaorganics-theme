import { h, FunctionComponent } from 'preact';
import { StateUpdater, useMemo, useCallback } from 'preact/hooks';

import { ProductType, VariantType } from 'types';

import { Image } from '../Image';

interface Props {
  chosenVariant?: VariantType;
  variants?: boolean;
  product?: ProductType;
  settings?: { [key: string]: string };
  swatchTypes?: { variants: string; products?: string };
  color: string;
  idx: number;
  name: string;
  variantOptions?: object;
  chosenProduct?: ProductType;
  setVariantOptions?: StateUpdater<any>;
  setChosenProduct?: StateUpdater<any>;
  setChosenVariant?: StateUpdater<any>;
  setQuantity?: StateUpdater<any>;
  enhanceProduct?: StateUpdater<any>;
}

const ProductColorOptionItem: FunctionComponent<Props> = ({
  chosenVariant,
  variants,
  color,
  idx,
  name,
  variantOptions,
  setVariantOptions,
  setQuantity,
  swatchTypes,
  settings,
  product,
  chosenProduct,
  setChosenVariant,
  enhanceProduct,
}) => {
  const renderSwatchColor = () => {
    const imageReg = /(https?:\/\/.*\.(?:png|jpg))/i;
    const isImage = imageReg.test(color);

    return isImage ? (
      <Image
        src={color}
        sizes={['26x26', '26x26']}
      />
    ) : (
      <span
        style={{
          backgroundColor: color.replace(' ', ''),
        }}
      />
    );
  };

  const isChecked = useMemo(() => {
    if (settings?.swatcher_type === swatchTypes.products && !variants) {
      return product?.id === chosenProduct?.id;
    }

    return variantOptions && variantOptions[name] === color;
  }, [settings, product, chosenProduct, variantOptions]);

  const isDisabled = useMemo(() => {
    const currentVariantObj = chosenProduct.variants.find((variant) => variant.title === color);

    if (!currentVariantObj) return;

    return !currentVariantObj?.available;
  }, [chosenProduct]);

  const handleChange = useCallback(() => {
    if (settings.swatcher_type === swatchTypes.products && !variants) {
      return () => {
        window.history.replaceState({}, '', product?.handle);

        enhanceProduct(product);

        setChosenVariant(product?.first_available_variant);
        setQuantity(1);
      };
    }

    return () => {
      setVariantOptions({ ...variantOptions, [name]: color });
    };
  }, [swatchTypes, product?.handle, variantOptions, chosenVariant]);

  return (
    <div className="relative mb-2 mr-2 inline-flex">
      <input
        type="radio"
        id={`filter-field-colors-01-${idx}-${name}`}
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
        name={`filter-field-colors-${name}`}
        onChange={handleChange()}
        checked={isChecked}
        disabled={isDisabled}
      />
      <label
        htmlFor={`filter-field-colors-01-${idx}-${name}`}
        className="
          group
          relative
          flex
          h-11
          w-11
          cursor-pointer
          items-center
          justify-center
          overflow-hidden
          border
          border-base-border
          p-[2px]
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
          after:bg-base-overlay-white
          after:opacity-0
          after:content-['']
          peer-checked:border-base-body
          peer-focus:border-base-body
          peer-disabled:pointer-events-none
          peer-disabled:cursor-default
          peer-disabled:after:opacity-100
        "
      >
        {settings?.swatcher_type === swatchTypes.variants ? (
          <span
            className="block h-full w-full group-[&.rounded-full]:rounded-full"
            style={{
              backgroundColor: color.replace(' ', ''),
            }}
          />
        ) : (
          renderSwatchColor()
        )}
      </label>
    </div>
  );
};

export default ProductColorOptionItem;

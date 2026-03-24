import { h, FunctionComponent } from 'preact';
import { StateUpdater } from 'preact/hooks';

import { OptionWithValuesType, ProductType } from 'types';
import ProductOptionItem from './ProductOptionItem';

interface Props {
  option: OptionWithValuesType | null;
  variantOptions: object;
  setVariantOptions: StateUpdater<any>;
  product?: ProductType;
}

const ProductOptionSelection: FunctionComponent<Props> = ({ option, variantOptions, setVariantOptions, product }) =>
  option?.values?.length && (
    <div className="mb-4 md:mb-5 md:w-10/12 xl:w-6/12">
      <div className="product__variant-label-box mb-1">
        <span className="mr-1 inline-block text-base-secondary">{option.name}: </span>
        <span>{variantOptions[option.name.toLowerCase()]}</span>
      </div>
      {option.values.map((value, idx) => (
        <ProductOptionItem
          name={option.name.toLowerCase()}
          value={value}
          idx={idx}
          key={value.id}
          variantOptions={variantOptions}
          setVariantOptions={setVariantOptions}
          product={product}
        />
      ))}
    </div>
  );

export default ProductOptionSelection;

import { h, FunctionComponent, Fragment } from 'preact';
import { useMemo, useEffect, useState } from 'preact/hooks';
import { formatMoney } from '@shopify/theme-currency/currency';
import { getId } from 'helpers/utils';

import { useDispatch } from 'store/hook';
import { addItem } from 'store/features/cart/cartSlice';
import { ProductType } from 'types';
import theme from 'helpers/themeSettings';

import ProductOptionSelection from './ProductOptionSelection';
import ProductColorOptionWrapper from './ProductColorOptionWrapper';
import ProductQuantity from './ProductQuantity';
import Button from '../Button';

interface Props {
  product: ProductType;
}

const ProductForm: FunctionComponent<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const colorOpt = 'color';
  const [variantOptions, setVariantOptions] = useState({});
  const [chosenVariant, setChosenVariant] = useState(null);
  const [chosenProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const buttonText = !chosenVariant?.available ? theme.strings.unavailable : theme.strings.addToCart;

  const productPrice = useMemo(() => {
    if (product.compare_at_price_max > product.price) {
      return (
        <Fragment>
          <ins
            className="no-underline"
            data-product-price
            dangerouslySetInnerHTML={{ __html: formatMoney(product.price, theme.moneyFormat) }}
          />
          <del
            className="text-base-sale-price"
            data-compare-text
            dangerouslySetInnerHTML={{ __html: formatMoney(product.compare_at_price_max, theme.moneyFormat) }}
          />
        </Fragment>
      );
    }

    return (
      <div
        data-product-price
        dangerouslySetInnerHTML={{
          __html: formatMoney(product?.selected_or_first_available_variant?.price, theme.moneyFormat),
        }}
      />
    );
  }, [product]);

  const productRenderCheck = useMemo(() => product?.options_with_values?.length, [product.options_with_values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chosenVariant) return;

    try {
      dispatch(
        addItem({
          id: chosenVariant?.id,
          quantity: {
            quantity: productQuantity,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!product.options_with_values?.length) return;

    const optionNames = product.options_with_values.reduce(
      (acc, curr, idx) =>
        product?.first_available_variant
          ? {
              ...acc,
              [curr.name.toLowerCase()]: product.first_available_variant.options[idx],
            }
          : { ...acc, [curr.name.toLowerCase()]: null },
      {}
    );

    setVariantOptions(optionNames);
  }, [product.options_with_values]);

  useEffect(() => {
    const keys = Object.keys(variantOptions);
    const values = Object.values(variantOptions);

    if (!keys.length || !values.length || !product) return;

    if (keys.length === values.length) {
      const newVariant = product?.variants?.find(
        (variant) => JSON.stringify(variant.options) === JSON.stringify(values)
      );

      const url = new URL(window.location as any);

      url.searchParams.set('variant', `${newVariant?.id}`);
      window.history.pushState({}, '', url);
      setChosenVariant(newVariant);
    }
  }, [variantOptions]);

  useEffect(() => {
    const paymentButtonWrapper = document.getElementById('payment-button-wrapper');

    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          document.dispatchEvent(new Event('payment-button-loaded'));
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(paymentButtonWrapper, config);

    document.addEventListener('payment-button-loaded', () => {
      const paymentButton = document.querySelector('.shopify-payment-button');

      document.getElementById('payment-button').appendChild(paymentButton);
    });

    return () => {
      document.removeEventListener('payment-button-loaded', () => null);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const paymentButtonSelect = document.getElementById('payment-button-select') as HTMLSelectElement;

    if (!chosenVariant || !paymentButtonSelect) return;

    const searchingOption = [].slice
      .call(paymentButtonSelect.options)
      .find((option) => parseInt(option.value, 10) === chosenVariant.id);

    if (searchingOption) searchingOption.selected = 'true';
  }, [chosenVariant]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 last:mb-0 md:mb-5"
    >
      <div
        className="mb-1 text-product-price-large md:mb-2 lg:text-product-price-large-desktop"
        data-price-wrapper
      >
        <div className="flex flex-wrap items-center gap-1">{productPrice}</div>
      </div>
      <div className="mb-4 last:mb-0 md:mb-5">
        {productRenderCheck &&
          product?.options_with_values?.length &&
          product?.options_with_values.map((option) =>
            option.name.toLowerCase() === colorOpt ? (
              <ProductColorOptionWrapper
                variants
                chosenProduct={chosenProduct}
                key={getId()}
                option={option}
                setVariantOptions={setVariantOptions}
                variantOptions={variantOptions}
                chosenVariant={chosenVariant}
              />
            ) : (
              <ProductOptionSelection
                key={getId()}
                option={option}
                variantOptions={variantOptions}
                setVariantOptions={setVariantOptions}
                product={product}
              />
            )
          )}
        <ProductQuantity
          setQuantity={setProductQuantity}
          quantity={productQuantity}
        />
      </div>
      <div className="mb-4 md:mb-5 md:w-10/12 xl:w-6/12">
        <div className="mb-4 last:mb-0">
          {product.selected_or_first_available_variant.available ? (
            <Button
              element="button"
              type="submit"
              className="w-full"
              color="primary"
              size="md"
              name="add"
              text={!chosenVariant || buttonText}
              disabled={!chosenVariant || !chosenVariant?.available}
            />
          ) : (
            <Button
              element="button"
              type="submit"
              className="w-full"
              color="primary"
              size="md"
              disabled
              text={theme.cart.soldOut}
            />
          )}
        </div>
        <div
          id="payment-button"
          className="mb-4 last:mb-0"
        />
      </div>
      {product.description && (
        <div
          className="prose mb-4 last:mb-0 md:mb-5"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      )}
    </form>
  );
};

export default ProductForm;

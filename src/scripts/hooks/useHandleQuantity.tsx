import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem as removeItemAction, updateItem as updateItemAction } from 'store/features/cart/cartSlice';
import { cartSelector } from 'store/selectors';
import useDebounce from './useDebounce';

interface cartErrorType {
  error: string;
  key: string;
}

export function useHandleQuantity(item) {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [cartError, setCartError] = useState<cartErrorType | null>(null);
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector);

  const updateItem = (quantity) => {
    const { key } = item;

    dispatch(
      updateItemAction({
        id: key,
        options: { quantity },
      })
    );
  };

  const removeItem = (e) => {
    e.preventDefault();
    dispatch(removeItemAction({ key: item.key }));
  };

  const handleUpdateItem = () => updateItem(inputValue);

  const changeQuantity = useDebounce(handleUpdateItem, 500);

  const handleChange = (e) => {
    const value = Math.max(0, e.target.value);

    setInputValue(value);
  };

  const decreaseQuantity = () => {
    setInputValue((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    if (!item) return;

    setInputValue(item?.quantity);
  }, [cart.items]);

  useEffect(() => {
    cart.error && setInputValue(item.quantity);
    (cart.error?.includes(item.title) || cart.error === null) &&
      setCartError({
        error: cart.error,
        key: item.key,
      });
  }, [cart.error]);

  return {
    inputValue,
    setInputValue,
    handleChange,
    handleUpdateItem,
    removeItem,
    changeQuantity,
    decreaseQuantity,
    cartError,
  };
}

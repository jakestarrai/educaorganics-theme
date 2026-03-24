import { useDispatch } from 'react-redux';
import { removeItem as removeItemAction, updateItem as updateItemAction } from 'store/features/cart/cartSlice';
import { useState } from 'preact/hooks';
import useDebounce from './useDebounce';

export function useSellingPlanAdd(item) {
  const dispatch = useDispatch();

  const updateItem = (selling_plan) => {
    const { key } = item;
    const { quantity } = item;

    dispatch(
      updateItemAction({
        id: key,
        options: { quantity, selling_plan },
      })
    );
  };

  const updateSellingPlanItem = (planId) => {
    if (planId) {
      updateItem(planId);
    }
  };

  return {
    updateSellingPlanItem,
  };
}

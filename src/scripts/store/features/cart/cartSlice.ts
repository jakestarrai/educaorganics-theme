import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cart from '@shopify/theme-cart';

import { CartItem, CartType } from 'types';
import theme from 'helpers/themeSettings';
import { changeItem } from './changeItem';

export interface CartChangeErrorResponse {
  status: number;
  message: string;
  description: string;
}

export interface CartState {
  cart: CartType;
  items: CartItem[];
  justAdded?: CartItem;
  item_count: number;
  loading?: boolean;
  popupActive: boolean;
  error: string | null;
}

export interface AddItemResponse {
  item: CartItem;
  cartData: CartType;
}

export interface AddItemToCartType {
  id: any;
  quantity?: { [key: string]: number };
}

export interface UpdateItemType {
  id: any;
  options?: { [key: string]: any };
}

const { items, item_count } = theme.cartState;

const initialState: CartState = {
  cart: theme.cartState,
  items,
  item_count,
  justAdded: null,
  loading: false,
  popupActive: false,
  error: null,
};

export const addItem = createAsyncThunk<AddItemResponse, AddItemToCartType>(
  'cart/addItem',
  async ({ id, quantity }) => {
    try {
      const item = await cart.addItem(id, quantity);

      const cartData = await cart.getState();

      return {
        item,
        cartData,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateItem = createAsyncThunk<CartType, UpdateItemType, { rejectValue: CartChangeErrorResponse }>(
  'cart/updateItem',
  async ({ id, options }: UpdateItemType, { rejectWithValue }) => {
    try {
      const cartState = await cart.getState();

      const cartData = await changeItem(id, options, cartState);

      return cartData;
    } catch (error) {
      const errorResp = (await error.json()) as CartChangeErrorResponse;

      return rejectWithValue(errorResp);
    }
  }
);

export const removeItem = createAsyncThunk('cart/removeItem', async ({ key }: { [key: string]: string }) => {
  try {
    const cartData = await cart.removeItem(key);

    return cartData;
  } catch (error) {
    console.log(error);
  }
});

export const getCart = createAsyncThunk('cart/getCart', async () => {
  try {
    const cartData = await cart.getState();

    return cartData;
  } catch (error) {
    console.log(error);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    closePopup: (state) => ({
      ...state,
      popupActive: false,
    }),
    openPopup: (state) => ({
      ...state,
      popupActive: true,
    }),
    openDrawer: (state) => ({
      ...state,
      drawerActive: true,
    }),
    addJustAdded: (state, { payload }) => ({
      ...state,
      justAdded: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addItem.fulfilled, (state, { payload }) => ({
      ...state,
      cart: payload.cartData,
      justAdded: payload.item,
      item_count: payload.cartData.item_count,
      items: payload.cartData.items,
      popupActive: true,
    }));

    builder.addCase(addItem.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(removeItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeItem.fulfilled, (state, { payload }) => ({
      ...state,
      cart: payload,
      items: payload.items,
      item_count: payload.item_count,
      loading: false,
    }));

    builder.addCase(removeItem.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateItem.fulfilled, (state, { payload }) => {
      return {
        ...state,
        cart: payload || state.cart,
        items: payload?.items || state.items,
        item_count: payload?.item_count ?? state.item_count,
        loading: false,
        error: null,
      };
    });

    builder.addCase(updateItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });

    builder.addCase(getCart.pending, (state) => {
      state.loading = false;
    });

    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      return {
        ...state,
        cart: payload,
        items: payload?.items || state.items,
        loading: false,
        item_count: payload.item_count,
      };
    });

    builder.addCase(getCart.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { closePopup, openPopup, openDrawer, addJustAdded } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

import { CartType } from 'types';

export {};

declare global {
  interface Window {
    Store: any;
    Shopify: any;
    cart: CartType;
    ResponsiveHelper: any;
  }
}

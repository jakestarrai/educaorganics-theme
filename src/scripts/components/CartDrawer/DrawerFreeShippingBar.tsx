import { Discount } from 'components/icons/Discount';
import { FunctionComponent, h } from 'preact';
import { formatMoney } from '@shopify/theme-currency/currency';
import theme from 'helpers/themeSettings';

interface Props {
  threshold: number;
  price: number;
}

export const DrawerFreeShippingBar: FunctionComponent<Props> = ({ threshold, price }) => {
  const progressPercents = ((price - threshold) * 100) / price;

  return (
    <div>
      {progressPercents <= 0 ? (
        <div className="bg-june-dark px-6 py-5 text-center text-base-accent lg:px-10">
          <div className="mb-3 text-body-xxs last:mb-0">
            {theme.cart.spend_for_free_shipping.replace('{{ price }}', formatMoney(threshold, theme.moneyFormat))}
            <a
              href={theme.cart.continue_shopping_link}
              className="ml-2 inline-block cursor-pointer text-white underline hover:no-underline"
            >
              {theme.cart.continue_shopping_text}
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-base-accent px-4 py-5 text-center lg:px-10">
          {threshold > 0 ? (
            <div>
              <div
                className="mb-3 text-body-xxs last:mb-0"
                dangerouslySetInnerHTML={{
                  __html: theme.cart.free_shipping_left.replace(
                    '{{ price }}',
                    formatMoney(threshold, theme.moneyFormat)
                  ),
                }}
              />
              <progress
                max="100"
                className="
              block
              h-2
              w-full
              appearance-none
              rounded
              border
              border-june-dark
              bg-transparent
              [&::-moz-progress-bar]:rounded
              [&::-moz-progress-bar]:bg-june-dark
              [&::-webkit-progress-bar]:rounded
              [&::-webkit-progress-bar]:bg-transparent
              [&::-webkit-progress-value]:bg-june-dark
              [&::-webkit-progress-value]:transition-all
              [&::-webkit-progress-value]:duration-300
              [&::-webkit-progress-value]:ease-in-out
            "
                value={progressPercents}
              />
            </div>
          ) : (
            <div className="mb-3 text-body-xxs last:mb-0">{theme.cart.free_shipping_riched}</div>
          )}
        </div>
      )}
    </div>
  );
};

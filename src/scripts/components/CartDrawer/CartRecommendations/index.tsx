import { FunctionComponent, h } from 'preact';
import { Loader } from 'components/Loader';

import theme from 'helpers/themeSettings';
import { useCartRecommendations } from 'hooks/useCartRecommendations';
import ProductCard from './ProductCard';

export const CartRecommendations: FunctionComponent = () => {
  const { recomendationsJson, isLoading } = useCartRecommendations();

  return (
    <div
      className="
      -mx-4
      -mt-4
      mb-4
      !hidden
      overflow-hidden
      bg-base-footer-background
      lg:absolute
      lg:right-[480px]
      lg:top-0
      lg:-z-1
      lg:mt-0
      lg:flex
      lg:h-full
      lg:w-[345px]
      lg:translate-x-[101%]
      lg:flex-col
      lg:transition-transform
      lg:delay-100
      lg:duration-300
      lg:ease-out
      lg:group-open/drawer:translate-x-0
      lg:group-open/drawer:delay-500
      "
    >
      <div className="shrink-0 px-4 pt-3 text-title lg:pb-3 lg:text-title-desktop">{theme.cart.you_may_like}</div>
      <div
        className="
          snap-x
          snap-mandatory
          overflow-x-auto
          overflow-y-hidden
          lg:h-full
          lg:overflow-y-auto
          lg:overflow-x-hidden
          "
      >
        {recomendationsJson !== null ? (
          <ul
            className="
                grid
                auto-cols-[minmax(302px,_1fr)]
                grid-flow-col
                lg:grid-flow-row
              "
          >
            {recomendationsJson?.slice(0, theme.cart.cartRecommendationsLimit).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
